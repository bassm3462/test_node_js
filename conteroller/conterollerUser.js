const mongoose = require("mongoose");
const users = require("../model/Users");
const filter = require("../validation/USERS");
const bcrypt = require("bcrypt");
const { response, request } = require("express");
const upload = require("../middleware/upload");
const sendEmail = require("../config/nodemelar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const randomstring = require("randomstring");
const { error, log } = require("console");

const show = async (req, res) => {
  console.log("tis is token", req.user);
  const userid = req.user;
  const show_user = await users.findById(userid).then((response) => {
    res.json({ response });
  });
  res.send("show user");
};
// start Register
const Register = async (req, res) => {
  try {
    const { name, email, password, repeat_password } = req.body;
    if (!name || !email || !password || !repeat_password) {
      return res.status(404).json({
        error: "email and password is required",
      });
    }
    // console.log(password, repeat_password);
    if (password != repeat_password) {
      return res
        .status(404)
        .json({ error: "repeat password must  mach to password" });
      // console.log(password, repeat_password);
    }
    if (password.length < 8 || repeat_password.length < 8) {
      return res
        .status(501)
        .json({ error: "Password must be at least 8 character or number" });
    }
    const user_email = await users.findOne({ email: req.body.email });
    if (user_email) {
      return res.status(404).json({ error: "this email already exist" });
    }

    const createUser = new users({
      name,
      email,
      password,
      SECURITY_COD: Math.random(),
    });
    const salt = await bcrypt.genSalt(10);
    createUser.password = await bcrypt.hash(createUser.password, salt);
    createUser.SECURITY_COD = await bcrypt.hash(createUser.SECURITY_COD, salt);
    await createUser
      .save()
      .then((response) => {
        // res.status(200).json({
        //   // response,
        //   success: "add success",
        //   dataobj: createUser,
        // });
        let url = `http://127.0.0.1:3000/api/verifiction?id=${response._id}`;
        const message = `${url}/user/verify/${response._id}/${response.SECURITY_COD}`;
        sendEmail(
          createUser.email,
          "Verify Email",
          response.name,
          response.SECURITY_COD,
          url
        );
        res.send("An Email sent to your account please verify");
      })
      .catch((error) => {
        console.log("Error", error);
        res.status(404).json({
          message: "something went wrong",
          error,
        });
      });
  } catch (error) {
    res.status(400).send("An error occured");
  }
  // res.send("user register");
};
// end Register
// start verification  from email
const verification = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.params.id });
    // if (!user) return res.status(400).send("Invalid link");

    // const token = await Token.findOne({
    //   userId: user._id,
    //   token: req.params.token,
    // });
    // if (!token) return res.status(400).send("Invalid link");

    // await User.updateOne({ _id: user._id, verified: true });
    // await Token.findByIdAndRemove(token._id);

    // res.send("email verified sucessfully");
    const updateinfo = await users.updateOne(
      { _id: req.query.id },
      { $set: { code: true } }
    );
    console.log(updateinfo);
    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured", error.message);
  }
};
// end verification from email
// start login page processor
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(404).json({
      error: "pleas Enter email and password ",
    });
  }
  const check_user = await users.findOne({ email: req.body.email });
  if (!check_user) {
    return res.status(404).json({
      error: " email and password  is error",
    });
  }
  const check_user_password = await bcrypt
    .compare(password, check_user.password)
    .then((response) => {
      if (check_user.user_type === false) {
        const token = jwt.sign({ _id: check_user._id }, "tokenID", {
          expiresIn: "1h",
        });
        res.header("x-access-token", token).json({
          // response,
          token,
          dataobj: check_user,
          message: "login success  user",
        });
      } else {
        const token = jwt.sign({ _id: check_user._id }, "tokenID", {
          expiresIn: "1d",
        });
        res.header("x-access-token", token).status(200).json({
          // response,
          token,
          dataobj: check_user,
          message: "login success admin",
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        error: "felid login",
      });
    });
  if (!check_user_password) {
    return res.status(404).json({
      error: " email and password  is error",
    });
  }
  res.send("login");
};
// end login page processor
// start forgot password
const forgotpass = async (req, res) => {
  try {
    const find_email = findOne({ email: req.body.email })
      .then((response) => {
        const token = randomstring.generate(24);
        let url = `http://127.0.0.1:3000/api/rest_password?id=${response._id}`;
        sendEmail(response.email, "resat_password", response.name, token, url);
      })
      .catch((error) => {
        res.status(404).json({
          message: "the email is error or not found",
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};
const resat_password = async (req, res) => {
  try {
    const id = req.query.id;
    const password = req.body.password;
    const updatedata = await users
      .findByIdAndUpdate(
        { _id: id },
        { $set: { password: updatedata.password } }
      )
      .then((response) => {
        res.status(200).json({
          message: "resat  password successfully",
          dataobj: updatedata,
        });
      })
      .catch((error) => {
        res.status.json({ message: "felid" });
      });
  } catch (error) {
    console.log(error.message);
  }
};
const delete_user = (req, res) => {
  const delete_user = users
    .findByIdAndRemove(req.params.id)
    .exec()
    .then((response) => {
      if (!response) {
        return res.status(500).json({ message: "not found" });
      } else {
        const pathfile = path.join("upload_image_profile/", response.image);
        deletefile(pathfile);
        res.status(200).json({ data: { response }, message: "deleted" });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  function deletefile(pathfile) {
    if (fs.existsSync(pathfile)) {
      fs.unlink(pathfile, (error) => {
        if (!error) {
          console.log("File deleted successfully");
        } else {
          throw new Error();
        }
      });
    } else {
      res.status(404).json({ error: "file dos not exit", path });
    }
  }
  // res.send("delete");
};
const update = async (req, res) => {
  try {
    const { name, email, password, repeat_password } = req.body;
    if (password != repeat_password) {
      return res
        .status(404)
        .json({ error: "repeat password must  mach to password" });
    }
    if (password.length < 8 || repeat_password.length < 8) {
      return res
        .status(501)
        .json({ error: "Password must be at least 8 character or number" });
    }
    const user_email = await users.findOne({ email: req.body.email });
    if (user_email) {
      return res.status(404).json({ error: "this email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    cpassword = await bcrypt.hash(password, salt);
    const updateUser = await users
      .findByIdAndUpdate(
        { _id: req.user },
        {
          $set: {
            name: name,
            email: email,
            password: cpassword,
            repeat_password: repeat_password,
          },
        },
        { new: true }
      )
      .exec()
      .then(async (response) => {
        res.json({ dataobj: response });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error.message);
  }
};
const update_image_profile = async (req, res) => {
  try {
    if (!req || !req.file) {
      return res.status(404).json({ message: "pleas insert image" });
    }
    const imagede = req.body.imagede;
    if (imagede !== "aveter.png") {
      console.log(imagede);
      const pathfile = path.join("upload_image_profile/", imagede);
      deletefile(pathfile);
    } else {
      const user = await users
        .findByIdAndUpdate(
          { _id: req.user },
          { $set: { image: req.file.filename } }
        )
        .exec()
        .then((response) => {
          res.status(200).json({ message: "update image successfully" });
        })
        .catch((error) => {
          res.status(404).json({ message: "felid update image" });
        });
    }
    function deletefile(pathfile) {
      if (fs.existsSync(pathfile)) {
        fs.unlink(pathfile, (error) => {
          if (!error) {
            console.log("File deleted successfully");
          } else {
            throw new Error();
          }
        });
      } else {
        res.status(404).json({ error: "file dos not exit", path });
      }
    }
  } catch (error) {
    console.log("update image profile", error.message);
  }
};
module.exports = {
  Register,
  login,
  delete_user,
  update,
  show,
  verification,
  forgotpass,
  resat_password,
  update_image_profile,
};
// git branch -M main
// git push -u origin main

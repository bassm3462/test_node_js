const mongoose = require("mongoose");
const users = require("../model/Users");
const filter = require("../validation/USERS");
const bcrypt = require("bcrypt");
const { response, request } = require("express");
const upload = require("../middleware/upload");
const { sendEmail, Resat } = require("../config/nodemelar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const randomstring = require("randomstring");
const { error, log } = require("console");
const CreateToken = require("../config/createScureToken");
const Department = require("../model/Department_management ");
const show = async (req, res) => {
  // console.log("tis is token", req.user);
  const userid = req.user;
  const show_user = await users
    .findById(userid)
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};
// start Register
const Register = async (req, res) => {
  const { name, email, password, repeat_password, Phone, Gender } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !repeat_password || !Phone || !Gender) {
    return res.status(404).json({
      message: "Pleas Enter all information",
    });
  }
  if (password != repeat_password) {
    return res
      .status(404)
      .json({ message: "repeat password must  mach to password" });
  }
  if (password.length < 8 || repeat_password.length < 8) {
    return res
      .status(501)
      .json({ message: "Password must be at least 8 character or number" });
  }
  if (isNaN(Phone)) {
    return res.status(400).json({ message: "Invalid Phone Number" });
  }
  if (Phone.length !== 11) {
    return res
      .status(400)
      .json({ message: "Number must Min and Max Equal (11 numbers)" });
  }
  const user_email = await users.findOne({ email: req.body.email });
  if (user_email) {
    return res.status(404).json({ message: "this email already exist" });
  }
  const createUser = new users({
    name,
    email,
    password,
    Phone,
    Gender,
    SECURITY_COD: Math.random(),
  });
  const salt = await bcrypt.genSalt(10);
  createUser.password = await bcrypt.hash(createUser.password, salt);
  createUser.SECURITY_COD = await bcrypt.hash(createUser.SECURITY_COD, salt);
  await createUser
    .save()
    .then((response) => {
      let url = `http://127.0.0.1:3000/api/verification?id=${response._id}`;
      const message = `${url}/user/verify/${response._id}/${response.SECURITY_COD}`;
      sendEmail(
        createUser.email,
        "Verify Email",
        response.name,
        response.SECURITY_COD,
        url
      );
      res.status(200).json({
        message: "An Email sent to your account please verify",
        dataobj: createUser,
      });
    })
    .catch((error) => {
      console.log("Error", error);
      res.status(404).json({
        message: "something went wrong",
        error,
      });
    });
};
// end Register
// start verification  from email
const verification = async (req, res) => {
  try {
    console.log(req.params["id"]);
    const updateinfo = await users
      .updateOne({ _id: req.params["id"] }, { $set: { code: true } })
      .then((response) => {
        response, res.json({ message: "email is verifie" });
      });
  } catch (error) {
    res.status(400).send("An error occured", error.message);
  }
};
// end verification from email
// start login page processor

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    if (user.code !== true) {
      return res.status(400).json({ message: "Please Verify Your Account " });
    }
    const token = CreateToken(user._id);
    res.header("token", token).status(200).json({
      message: "User logged in successfully",
      success: true,
      dataobj: user,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
// end login page processor
// start forgot password
const forgotpass = async (req, res) => {
  console.log(req.body.email);
  await users
    .findOne({ email: req.body.email })
    .then((response) => {
      console.log(response);
      const token = randomstring.generate(24);
      console.log(token)
      let url = `http://127.0.0.1:4000/api/rest_password?id=${response._id}`;
      Resat(response.email, "resat password", response.name, token, url);
      res
        .status(200)
        .json({
          message: `this email correct pleas Check your account ${response.email}`,
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "the email is error or not found",
        error,
      });
    });
};

const resat_password = async (req, res) => {
  try {
    const id = req.params["id"];
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
const delete_user = async (req, res) => {
  await users
    .findByIdAndRemove(req.params.id)
    .exec()
    .then((response) => {
      if (!response) {
        return res.status(500).json({ message: "not found" });
      } else {
        if (response.image === "aveter.png") {
          return res.status(200).send("Delelet esuccess");
        }
        const pathfile = path.join("upload_image_profile/", response.image);
        deletefile(pathfile);
        res
          .status(200)
          .json({ message: `User ${response.name} Deleted successfully` });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "error" });
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
};

const update = async (req, res) => {
  try {
    const { name, email, password, repeat_password, Phone } = req.body;
    console.log(req.body);
    console.log(req.user);
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
    await users
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: name,
            email: email,
            password: cpassword,
            repeat_password: repeat_password,
            Phone,
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
    const user = await users
      .findByIdAndUpdate(
        { _id: req.user },
        { $set: { image: req.file.filename } }
      )
      .exec()
      .then((response) => {
        if (imagede === "aveter.png") {
          return res.status(200).json({ message: "update image successfully" });
        }
        const pathfile = path.join("upload_image_profile/", imagede);
        deletefile(pathfile);
        res.status(200).json({ message: "update image successfully" });
      })
      .catch((error) => {
        res.status(404).json({ message: "felid update image" });
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
  } catch (error) {
    console.log("update image profile", error.message);
  }
};

module.exports = {
  Register,
  Login,
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

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
const { error } = require("console");
const show = (req, res) => {
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
    console.log(password, repeat_password);
    if (!password === repeat_password) {
      return res
        .status(404)
        .json({ error: "repeat password must  mach to password" });
      console.log(password, repeat_password);
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
    if (!req.file) {
      // const createUser = new users({
      //   name,
      //   email,
      //   password,
      //   SECURITY_COD:Math.random()
      // });
      res.status(404).json("image is required");
    }

    const createUser = new users({
      name,
      email,
      password,
      image: req.file.filename,
      SECURITY_COD: Math.random(),
    });
    const salt = await bcrypt.genSalt(10);
    createUser.password = await bcrypt.hash(createUser.password, salt);
    createUser.SECURITY_COD = await bcrypt.hash(createUser.SECURITY_COD, salt);
    await createUser
      .save()
      .then((response) => {
        // res.status(200).json({
        //   response,
        //   success: "add success",
        // });
        const url = "http://127.0.0.1:3000/api/verifiction";
        const message = `${url}/user/verify/${response._id}/${response.SECURITY_COD}`;
        sendEmail(response.email, "Verify Email", message);
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
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
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
      const token = jwt.sign({ _id: check_user._id }, "tokenID", {
        expiresIn: "1h",
      });
      res.status(200).json({
        response,
        token,
        dataobj: check_user,
        message: "login success",
      });
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

const delete_user = (req, res) => {
  const delete_user = users
    .findByIdAndRemove(req.params.id)
    .then((response) => {
      if (!response) {
        return res.status(500).json({ message: "not found" });
      }
      return res.status(200).json({ data: { response }, message: "deleted" });
      const pathfile = path.join("../upload_image_profile/", response.image);
      const deletefile = (pathfile) => {
        if (fs.existsSync(pathfile)) {
          fs.unlinkSync(`${pathfile}`)
            .then((response) => {
              res.status(200).json({ message: "delete success" });
            })
            .catch((error) => {
              res.send("err", error, "pathfile", pathfile);
            });
        } else {
          res.status(404).json({ error: "file dos not exit",path });
        }
      };
    }).catch(error=>{
      console.log('error',error,'req.body', req.body );
    });
  // res.send("delete");
};

const update = (req, res) => {
  res.send("update profile");
};
const resat_Password = (req, res) => {
  res.send("update profile");
};
module.exports = { Register, login, delete_user, update, show, verification };
// git branch -M main
// git push -u origin main

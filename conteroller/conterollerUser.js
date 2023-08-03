const mongoose = require("mongoose");
const users = require("../model/Users");
const filter = require("../validation/USERS");
const bcrypt = require("bcrypt");
const { response } = require("express");
const upload = require("../middleware/upload");
const jwt=require("jsonwebtoken")
const show = (req, res) => {
  res.send("show user");
};
const Register = async (req, res) => {
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
    const createUser = new users({
      name,
      email,
      password,
    });
  }
  const createUser = new users({
    name,
    email,
    password,
    image: req.file.filename
  });
  const salt = await bcrypt.genSalt(10);
  createUser.password = await bcrypt.hash(createUser.password, salt);
  await createUser
    .save()
    .then((response) => {
      res.status(200).json({
        response,
        success: "add success",
      });
    })
    .catch((error) => {
      console.log("Error", error);
      res.status(404).json({
        message: "something went wrong",
        error,
      });
    });
  // res.send("user register");
};
// login page processor
const login = async(req, res) => {
  const email=req.body.email;
  const password=req.body.password;

  if(!email ||!password ){
    return res.status(404).json({
      error: "pleas Enter email and password ",})
  }
  const check_user= await users.findOne({email:req.body.email})
  if(!check_user){
    return res.status(404).json({
      error: " email and password  is error"})
  }
  const check_user_password= await bcrypt.compare(password,check_user.password).then(response=>{
    const token =jwt.sign({_id:check_user._id},"tokenID",{expiresIn:"1h"})
    res.status(200).json({
      response,
      token,
      dataobj:check_user,
      message:"login success"
    })
  }).catch(error=>{
    return res.status(404).json({
      error: "felid login"})
  })
  if(!check_user_password){
    return res.status(404).json({
      error: " email and password  is error"})
  }
  res.send("login");
};
const delete_user = (req, res) => {
  res.send("delete");
};
const update = (req, res) => {
  res.send("update profile");
};

module.exports = { Register, login, delete_user, update, show };
// git branch -M main
// git push -u origin main
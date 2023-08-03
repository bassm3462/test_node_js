const mongoose = require("mongoose");
// const Users = require("../model/Users");

const show = (req, res) => {
  res.send("show user");
};
const Register = (req, res) => {
  res.send("user register");
};
const login = (req, res) => {
  res.send("login");
};
const delete_user = (req, res) => {
  res.send("delete");
};
const update = (req, res) => {
  res.send("update profile");
};

module.exports={Register, login ,delete_user,update,show}
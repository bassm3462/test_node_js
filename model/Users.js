const { boolean } = require("joi");
const mongoose = require("mongoose");
const Department=require("../model/Department_management ");
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String },
  password: { type: String }, //hashed version of the users's password to store secure
  image: { type: String, default: "aveter.png" },
  code: { type: Boolean,default: false},
  user_type: { type: String, default: "Costumer", },
  SECURITY_COD: { type: String },
  Phone: { type: String,  },
  Gender: { type: String,  },
  Department:{ type: mongoose.Schema.Types.ObjectId,ref:"Department", },
});
const users = new mongoose.model("users", userSchema);
module.exports = users;

const { boolean, string } = require("joi");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Department=require("./Department_management ")
const productsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image:String,
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: "none",
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: "none",
    },
    quantity: {
      type: Number,
      required: true,
    },
    Available: {
      type: Number,
      default:"0"
    },
    totalPrice: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const products = new mongoose.model("products", productsSchema);
module.exports = products;

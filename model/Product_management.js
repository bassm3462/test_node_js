const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const productsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image:String,
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    Image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    quantity: {
      type: Number,
      required: true,
    },
    Available: {
      type: Number,
      default:"0"
    },
    count: {
      type: Number,
      default:"0"
    },
    discount:{
      type:Number,
      default:'1'
    },
    ratings: [
      {
        star: Number,
        comment: String,
        PostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
  },
 
  {
    timestamps: true,
  }
);
const products = new mongoose.model("products", productsSchema);
module.exports = products;

const { array } = require("joi");
const mongoose =require("mongoose");
const timestamps = require("mongoose-timestamp");
const ImageSchema= mongoose.Schema({
 image: [],
  productID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  }
},
{
    timestamps: true,
  }
);
const Image = new mongoose.model("uploadImage",ImageSchema );
module.exports=Image
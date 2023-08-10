const { boolean } = require("joi");
const mongoose=require("mongoose")

const CameraSchema=mongoose.Schema({
    name:{type:String,required:true},
    url:{type: String,required:true},
    locutions:{type:String,required:true},
});
const product=new mongoose.model("Camera",CameraSchema);
module.exports=product
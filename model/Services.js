const { boolean } = require("joi");
const mongoose=require("mongoose")

const SocialMediaSchema=mongoose.Schema({
   Title:{type:String},
Description:{type:String},
Image:{type:String}
});
const SocialMedia=new mongoose.model("SocialMedia",SocialMediaSchema);
module.exports=SocialMedia
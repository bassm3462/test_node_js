const { boolean } = require("joi");
const mongoose=require("mongoose")

const SocialMediaSchema=mongoose.Schema({
   FacBook:{type:String},
Twitter:{type:String},
Instagram:{type:String}
});
const SocialMedia=new mongoose.model("SocialMedia",SocialMediaSchema);
module.exports=SocialMedia
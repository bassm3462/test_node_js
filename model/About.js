const { boolean } = require("joi");
const mongoose=require("mongoose")

const AboutSchema=mongoose.Schema({
   About:{type:String},
   // title:{type:String}

});
const About=new mongoose.model("About",AboutSchema);
module.exports=About
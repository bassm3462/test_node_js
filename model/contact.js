const { boolean } = require("joi");
const mongoose=require("mongoose")
const ContactSchema=mongoose.Schema({
   phoneNumber:{type:String},
   Location :{type:String},
   hourBusiness:{type:String}

});
const Contact=new mongoose.model("Contact",ContactSchema);
module.exports=Contact
const { boolean } = require("joi");
const mongoose=require("mongoose")

const productsSchema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type: String,required:true},
    department:{type:String,required:true},
    description: {type:String,required:true}
   
});
const product=new mongoose.model("products",productsSchema);
module.exports=product
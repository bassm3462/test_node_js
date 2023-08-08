const { boolean } = require("joi");
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:{type: String},
    password: { type : String}, //hashed version of the users's password to store secure
    image:{type:String,default:"aveter.png"},
    code:{
        type: Boolean,
        default: false
    },
    user_type:{
        type:Boolean,
        default:false
    },
    SECURITY_COD:{type:String}
});
const users=new mongoose.model("users",userSchema);
module.exports=users
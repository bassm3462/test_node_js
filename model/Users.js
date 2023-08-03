const mongoose=require("mongoose")
const joi=require("joi")

const userSchema=mongoose.Schema({
    name:String,
    email:{type: String},
    password: { type : String}, //hashed version of the users's password to store secure
    image:{type:String}
});
// const Schema=joi.object({
//     name:joi.required().string().min(3).max(50),
//     email :  joi.required().string().email(),
//     password:joi.required().string().min(8)
// })
const users=new mongoose.model("users",userSchema);
module.exports=users
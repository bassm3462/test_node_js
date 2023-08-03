const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:String,
    email:{type: String},
    virfivtiCod: { type : String}, //hashed version of the users's password to store secure
    image:{type:String},
 expird:{type:String}
});

const users=new mongoose.model("users",userSchema);
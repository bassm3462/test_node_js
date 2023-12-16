
const mongoose = require("mongoose");
const users = require("../model/Users");
const bcrypt = require("bcrypt");
const { response } = require("express");
const Register = async (req, res) => {
    const { name, email, password, user_type, Phone, Gender,Department ,active} = req.body;
    let code=false;
    console.log( req.body)
    if(active=="1"){
       code=true
    }else{
     code =false
    }
    if (!name || !email || !password || !user_type || !Phone || !Gender||!Department) {
        return res.status(404).json({ message: "Pleas Enter all information", });
    }
    if (password.length < 8) { return res.status(501).json({ message: "Password must be at least 8 character or number" }); }
    if (isNaN(Phone)) {
        return res.status(400).json({ message: 'Invalid Phone Number' })
    }
    if (Phone.length !== 11) {
        return res.status(400).json({ message: 'Number must Min and Max Equal (11 numbers)' })
    }
    const user_email = await users.findOne({ email: req.body.email });
    if (user_email) { return res.status(404).json({ message: "this email already exist" }); }
    const createUser = new users({
        name, email, password, Phone, Gender, user_type,Department,code:code
    });
    const salt = await bcrypt.genSalt(10);
    createUser.password = await bcrypt.hash(createUser.password, salt);
    await createUser.save().then((response) => {
        res.status(200).json({ message: "Add Employ successfully", dataobj: createUser, });
    }).catch((error) => {
        console.log("Error", error); res.status(404).json({
            message: "something went wrong",
            error,
        })
    });
};
const DisplayEmploy=async(req,res)=>{
    await users.find({user_type:"Employ"}).populate("Department","name").select("-SECURITY_COD").exec().then(response=>{
        return res.status(200).json({response})
    }).catch(error=>{return res.status(400).json({error})})
}
module.exports = { Register,DisplayEmploy};
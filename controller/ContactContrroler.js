const { response } = require("express");
const Contact=require("../model/contact");
const writeContact=(req,res)=>{
    const {phonNumber ,Location,hourBusiness}=req.body;
    const newContact =new Contact ({
        phonNumber,
        Location,
        hourBusiness
    })
    newContact.save().then((response) => {
        res.status(200).json({message:"Added successfully",response})
        
    }).catch((err) => {
        res.status(400).json({err,message:"invalid"})
    });
}
const getContact=(req,res)=>{
    Contact.find().then(response=>{
        if (response==null || !response[0]){
            return  res.status(500).json({error:true});
            }else{
                return   res.status(200).send({"data":response,"success":"true"});
                }
                }).catch((err)=>{err})
}
module.exports={writeContact,getContact};
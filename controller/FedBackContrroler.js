const { response } = require("express");
const FedBack=require("../model/fedBack");
const writeFedBack=(req,res)=>{
    const {phonNumber ,Location,hourBusiness}=req.body;
    if (!FedBack){
        return res.status(401).json({msg:"Please enter the content"})
    }
    const newFedBack =new FedBack ({
        phonNumber,
        Location,
        hourBusiness
    })
    newFedBack.save().then((response) => {
        res.status(200).json({message:"Added successfully",response})
        
    }).catch((err) => {
        res.status(400).json({err,message:"invalid"})
    });
}
const getFedBack=(req,res)=>{
    FedBack.find().then(response=>{
        if (response==null || !response[0]){
            return  res.status(500).json({error:true});
            }else{
                return   res.status(200).send({"data":response,"success":"true"});
                }
                }).catch((err)=>{err})
}
module.exports={writeFedBack,getFedBack};
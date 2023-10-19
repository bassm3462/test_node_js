const { response } = require("express");
const SocialMedia=require("../model/socialMedia");
const writeSocialMedia=(req,res)=>{
    const {phonNumber ,Location,hourBusiness}=req.body;
    if (!SocialMedia){
        return res.status(401).json({msg:"Please enter the content"})
    }
    const newSocialMedia =new SocialMedia ({
        phonNumber,
        Location,
        hourBusiness
    })
    newSocialMedia.save().then((response) => {
        res.status(200).json({message:"Added successfully",response})
        
    }).catch((err) => {
        res.status(400).json({err,message:"invalid"})
    });
}
const getSocialMedia=(req,res)=>{
    SocialMedia.find().then(response=>{
        if (response==null || !response[0]){
            return  res.status(500).json({error:true});
            }else{
                return   res.status(200).send({"data":response,"success":"true"});
                }
                }).catch((err)=>{err})
}
module.exports={writeSocialMedia,getSocialMedia};
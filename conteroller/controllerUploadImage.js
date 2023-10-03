const mongoose = require("mongoose");
const Image = require("../model/Images");
const UploadImage = async (req, res) => {
  if(req.files){
    console.log("files",req.files)
  }
  if(req.files.length===0){
    return  res.status(400).json({ message:"pleas Select image"})
  }
  if (req.files && req.files.length >= 6) {
    res.status(400).json({ message: "You can upload a maximum of 6 images" });
  }
   
  // if(!image){
  //   return   res.status(501).json('No file uploaded')
  // }
    const files= req.files.map(file => {
      return {
        filename: file.filename,
      };
    });
    // console.log(files);
    if(!files){
      return    res.status(502).json('Error uploading the file')
    }
    const UploadIMage = new Image({
      image:files,
      // productID:req.query.id,
    });
    await UploadIMage
      .save()
      .then((response) => { res.status(200).json({success: "add success", dataobj: UploadIMage,});
      })
      .catch((error) => {
        console.log( error)
        throw new Error
      });
};
const DisplayImage=async(req,res)=>{
  await Image.findById(req.params.id).then(response=>{
    return res.status(200).json({response})
  }).catch(error=>{
    return res.status(404).json({error})
  })
}
module.exports = { UploadImage,DisplayImage };
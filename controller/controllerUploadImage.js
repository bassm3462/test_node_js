const mongoose = require("mongoose");
const Image = require("../model/Images");
const { error } = require("../validation/USERS");
const { DeletImage } = require("../config/DeleteImage");
const fs = require("fs");
const path = require("path");
const UploadImage = async (req, res) => {
  if (req.files) {
    console.log("files", req.files);
  }
  if (req.files.length === 0) {
    return res.status(400).json({ message: "pleas Select image" });
  }
  if (req.files && req.files.length >= 6) {
    res.status(400).json({ message: "You can upload a maximum of 6 images" });
  }

  const files = req.files.map((file) => {
    return {
      filename: file.filename,
    };
  });
  if (!files) {
    return res.status(502).json("Error uploading the file");
  }
  const UploadIMage = new Image({
    image: files,
    productID: req.query.id,
  });
  await UploadIMage.save()
    .then((response) => {
      if (!response) {
        return res.status(403).json({ message: "No Images Found " })
      }
      res.status(200).json({ success: "add success", dataobj: UploadIMage });
    })
    .catch((error) => {
      throw new Error();
    });
};
const DisplayImage = async (req, res) => {
  if (!req.params.id) {
    return res.status(401).json({ message: "Invalid request" });
  }
  await Image.findOne({ productID: req.params.id }).then(response => {
    if (!response) {
      return res.status(403).json({ message: "No Images Found For this Product ID" })
    }
    return res.status(200).json({ response });
  }).catch(error => {
    return res.status(400).json({ message: "No Images Found For This Product ID", error })
  })


  return res.status(400).json({ message: "invalid" });
};
const DispalyProductWithImage=async(req,res)=>{
  await Image
  .find()
  .populate("productID",)
  .exec()
  .then((response) => {
    return res.status(200).json({ response });
  })
  .catch((error) => {
    return res.status(503).json({ message: "server Error", error });
  });
  }
const DeletImageByID = async (req, res) => {
  const id = req.params.id;
  await Image.findByIdAndRemove(id)
    .then((response) => {
      if (!response) {
        return res.status(400).json({ message: "No such id" });
      }
      response.image.map((file) => {
        const pathUpload = path.join(`upload_image_profile/${file.filename}`);
        if (fs.existsSync(pathUpload)) {
          const DeletFile = fs.unlinkSync(pathUpload);
          if (!DeletFile) {
            console.log("Deleted", pathUpload, "Success");
          } else {
            console.log(`Not Found ${pathUpload}`);
          }
        } else {
          res.status(404).json({
            message: `File not found`,
          });
        }
      });
      return res.status(200).json({ message: `Deleted successfully` });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: "delete error" });
    });
};
module.exports = { UploadImage, DisplayImage, DeletImageByID,DispalyProductWithImage };

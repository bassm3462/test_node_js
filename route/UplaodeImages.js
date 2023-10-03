const express = require("express");
const {
    UploadImage,
    DisplayImage
} = require("../conteroller/controllerUploadImage");
const router = express.Router();
const upload = require("../middleware/upload");
const auth=require("../middleware/auth")
router.get("Employ/Data",auth ,DisplayImage);
http://localhost:4000/api/Employ/data
//create product 
router.post("/Employ/UploadImage" ,upload.array("image"), UploadImage);
//http://localhost:4000/api/Emaply/UploadImage
module.exports = router;

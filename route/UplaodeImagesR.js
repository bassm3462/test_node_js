const express = require("express");
const {
    UploadImage,
    DisplayImage,
    DeletImageByID,
    DispalyProductWithImage
} = require("../controller/controllerUploadImage");
const router = express.Router();
const {upload} = require("../middleware/upload");
const auth=require("../middleware/auth")
router.get("/Employ/Product/arrayImage/:id" ,DisplayImage);
// http://localhost:4000/api/Employ/Product/arrayImage/:id
//create product 
router.post("/Employ/UploadImage" ,upload.array("images"), UploadImage);
//http://localhost:4000/api/Emaply/UploadImage
//delete image by id
router.delete('/Employ/DeleteImageById/:id',DeletImageByID)
router.get("/employ/getProductWithImage",DispalyProductWithImage)

module.exports = router;

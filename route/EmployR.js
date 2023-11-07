const express = require("express");
const {Register,DisplayEmploy}=require("../controller/controllerEmploy")
const {upload} = require("../middleware/upload");
const router = express.Router();

router.post("/admin/Employ", upload.single("image"), Register);
// http://127.0.0.1:4000/api/admin/Employ

router.get("/admin/Employ/List", DisplayEmploy);
// http://localhost:4000/api/admin/Employ/List
module.exports=router;
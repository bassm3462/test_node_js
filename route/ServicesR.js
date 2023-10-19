const express=require("express");
const { AddServices, getServices, DeleteSericesById}=require("../controller/ServiceController");
const Route=express.Router()
const auth =require("../middleware/auth");
const upload =require("../middleware/upload");
Route.post("/Admin/AddServices",auth,upload.single("image"),AddServices);
// http://localhost:400/api/Admin/AddServices
Route.get("/Admin/getServices",auth,getServices);
// http://localhost:400/api/Admin/getServices
Route.delete("/admin/DeleteServices",auth,DeleteSericesById);
// http://localhost:400/api/admin.DeleteServices
module.exports =Route


const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const Route = express.Router();
const { DepartmentInfo, show_Details, Delete, EditFile, EditDepartment,DepartmentDispalay } = require("../controller/controllerDepartment");
Route.post("/Department/Create", upload.single("image"), DepartmentInfo);
// http://127.0.0.1:4000/api/Department/Create
Route.get("/Department/show", show_Details);
//http://localhost:4000/api/Department/show
Route.delete('/Department/Delete/:id', Delete);
//http://localhost:4000/api/Department/Delete/:id
Route.put("/Department/Edit/:id", EditDepartment)
//http://localhost:4000/api/Department/Edit/:id
Route.put("/Department/Edit/image/:id",upload.single("image"), EditFile)
//http://localhost:4000/api/Department/Edit/image/:id
Route.get("/Department/Display/:id",auth,DepartmentDispalay)
//http://localhost:4000/api/Department/Display/:id
module.exports = Route;


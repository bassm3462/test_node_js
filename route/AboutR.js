const express = require("express");
const auth = require("../middleware/auth");
const Route = express.Router();
const {getAbout,SetAbout,EditAboutbByID,DeleteAboutById} = require("../controller/AboutController")
Route.post("/Admin/setAbout",SetAbout);
// http://localhost:4000/api/Admin/setAbout
Route.get("/Admin/getAbout", getAbout);
// http:localhost:4000/api/Admin/getAbout;4
Route.put('/Admin/editAbout/:id', EditAboutbByID)
// http://localhost:4000/api/Admin/editAbout/:id
Route.delete('/Admin/DeleteAbout/:id', DeleteAboutById)
// http://localhost:4000/api/Admin/DeleteAbout/:id

module.exports=Route
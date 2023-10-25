const {AddMessage,getMessage}= require("../controller/ControllerChats")
const express=require("express")
const auth =require("../middleware/auth")
const router = express.Router()
router.post("/Chat/AddMessage/:id",auth,AddMessage)
router.get("/Chat/getMessage/:id",auth,getMessage)

module.exports=router
const {AddOffers,getAllOffers}= require("../controller/OffersController")
const express=require("express")
const auth =require("../middleware/auth")
const router = express.Router()
const Upload=require("../middleware/upload")
router.post("/Employ/Offers",auth,Upload.single("image"),AddOffers)
router.get("/Employ/GetAllOffers",getAllOffers)
module.exports=router;
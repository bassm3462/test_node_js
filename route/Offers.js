const {AddOffers,getAllOffers}= require("../controller/OffersController")
const express=require("express")
const auth =require("../middleware/auth")
const router = express.Router()
const {upload}=require("../middleware/upload")
router.post("/Employ/Offers",auth,upload.single("image"),AddOffers)
router.get("/Employ/GetAllOffers",getAllOffers)
module.exports=router;
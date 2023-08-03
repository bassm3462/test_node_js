const express=require("express");
const {Register, login ,delete_user,update ,show}=require("../conteroller/conterollerUser");
const router = express.Router();
const upload=require("../middleware/upload");

router.get("/",show);
//register user
router.post("/signup",upload.single("image"), Register);
//http://localhost:3001/api/signup
router.post("/login",login);
//login
// http://localhost:3001/api/login
router.put("/update",update)
//update
// http://localhost:3001/api/update
router.delete("/delete",delete_user)
module.exports=router;


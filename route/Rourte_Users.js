const express=require("express");
const {Register, login ,delete_user,update ,show ,verification}=require("../conteroller/conterollerUser");
const router = express.Router();
const upload=require("../middleware/upload");

router.get("/",show);
//register user
router.post("/signup",upload.single("image"), Register);
//http://localhost:3001/api/signup
// verification
router.post("/verification",verification);
//http://localhost:3001/api/verification

//login
router.post("/login",login);
// http://localhost:3001/api/login

router.put("/update",update)
//update
// http://localhost:3001/api/update

router.get("/delete/:id",delete_user)
module.exports=router;


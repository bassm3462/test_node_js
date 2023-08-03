const express=require("express");
const {Register, login ,delete_user,update ,show}=require("../conteroller/mangement_usere");
const router = express.Router();
router.get("/",show);
//register user
router.get("/signup", Register);
//http://localhost:3001/api/signup
router.get("/login",login);
//login
// http://localhost:3001/api/login
router.put("/update",update)
//update
// http://localhost:3001/api/update
router.delete("/delete",delete_user)
module.exports=router;


const express = require("express");
const {
  Register,
  login,
  delete_user,
  update,
  show,
  verification,
  forgotpass,
  resat_password, 
  update_image_profile,
} = require("../conteroller/conterollerUser");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
router.get("/",auth,show);
//register user
router.post("/signup", upload.single("image"), Register);
//http://localhost:4000/api/signup
// verification
router.get("/verification", verification);
//http://localhost:4000/api/verification
//login
router.post("/login", login);
// http://localhost:4000/api/login
router.get("/forgot_password",forgotpass)
// http://localhost:4000/api/forgot_password
router.get("/rest_password",resat_password)
// http://localhost:4000/api/reset-password?
router.put("/Update",auth, update);
//update
// http://localhost:4000/api/update
router.put("/update_image_profile",auth,upload.single("image"),update_image_profile)
// http://localhost:4000/api/update_image_profile?
router.delete("/delete/:id", delete_user);
module.exports = router;

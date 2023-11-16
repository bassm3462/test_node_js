const express = require("express");
const {
  Register,
  Login,
  delete_user,
  update,
  show,
  verification,
  forgotpass,
  resat_password, 
  update_image_profile,
} = require("../controller/conterollerUser");
const router = express.Router();
const {upload} = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/dashboard",auth,show);
//register user
router.post("/signup", upload.single("image"), Register);
//http://localhost:4000/api/signup
// verification
router.get("/verification/:id", verification);
//http://localhost:4000/api/verification/id
//login
router.post("/login", Login);
// http://localhost:4000/api/login
router.post("/users/forgot_password",forgotpass)
// http://localhost:4000/api/users/forgot_password
router.get("/rest_password",resat_password)
// http://localhost:4000/api/reset-password?
router.put("/User/Update/:id", update);
//update
// http://localhost:4000/api/update
router.put("/update_image_profile/:id",upload.single("image"),update_image_profile)
// http://localhost:4000/api/update_image_profile/:id
router.delete("/delete/:id", delete_user);
module.exports = router;

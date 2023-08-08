const express = require("express");
const {
    insertproduct,
} = require("../conteroller/controllerproduct");
const router = express.Router();
const upload = require("../middleware/upload");

router.get("/", show);
//create product 
router.post("/admin/create_Product", upload.single("image"), insertproduct);
//http://localhost:4000/api//admin/create_Product

router.put("/update", update);
//update
// http://localhost:4000/api/update

router.get("/delete/:id", delete_user);
module.exports = router;

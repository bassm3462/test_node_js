const express = require("express");
const {
    createProduct,
    DisplayProducts,
    DisplaySingleProduct,
    EditProduct,
    DispalyProductAndDepartment,
} = require("../conteroller/controllerproduct");
const router = express.Router();
const upload = require("../middleware/upload");
const auth=require("../middleware/auth")

router.get("/Employ/Data/:id",auth,DisplayProducts);
//http://localhost:4000/api/Employ/data
//create product 
router.post("/Employ/create_Product",auth ,upload.single("image"), createProduct);
//http://localhost:4000/api/admin/create_Product
router.get("/Employ/Data/Product/:id",auth ,DisplaySingleProduct);
//http://localhost:4000/api/Employ/Data/Product/12356789
router.get("/Admin/productList",auth,DispalyProductAndDepartment)
//http://localhost:4000/api/Admin/productList
//http://localhost:4000/api/Employ/data
// router.put("/update", auth,update);
//update
// http://localhost:4000/api/update
// router.get("/delete/:id", delete_user);
module.exports = router;

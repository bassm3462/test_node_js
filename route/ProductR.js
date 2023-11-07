const express = require("express");
const {
    createProduct,
    DisplayProducts,
    DisplaySingleProduct,
    EditProduct,
    DispalyProductAndDepartment,
    DeleteProduct,
} = require("../controller/controllerProduct");
const router = express.Router();
const {upload,uploadDetails} = require("../middleware/upload");
const auth=require("../middleware/auth")
router.get("/Employ/Data/:id",DisplayProducts);
//http://localhost:4000/api/Employ/data/:id
//create product 
router.post("/Employ/create_Product" ,upload.single("image"), createProduct);
//http://localhost:4000/api/admin/create_Product
router.get("/Employ/Data/Product/:id" ,DisplaySingleProduct);
//http://localhost:4000/api/Employ/Data/Product/:id
router.get("/Admin/productList",DispalyProductAndDepartment)
//http://localhost:4000/api/Admin/productList
router.delete("/Employ/Product/Delete/:id",DeleteProduct),
//http://localhost:4000/api/Employ/Product/Delete/:id
router.put('/employ/edit-product/:id',upload.single('image'),EditProduct)
//http://localhost:4000/api/employ/edit-product/:id
module.exports = router;

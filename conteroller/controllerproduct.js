const mongoose = require("mongoose");
const products = require("../model/Product_management");

const insertproduct = async (req, res) => {
  try {
    const { name, department, description } = req.body;
    name = name.trim();
    department = department.trim();
    description = description.trim();
    if (!name || !image || !department || !description) {
      return res.status(404).json({
        error: "should insert all information",
      });
    }
    const createProduct = new products({
      name,
      image: req.file.filename,
      department,
      description,
    });
    await createProduct
      .save()
      .then((response) => {
        res.status(200).json({
          // response,
          success: "add success",
          dataobj: createProduct,
        });
      })
      .catch((error) => {
        console.log("Error", error);
        res.status(404).json({
          message: "something went wrong",
          error,
        });
      });
  } catch (error) {
    res.status(400).send("An error occured");
  }
  // res.send("create products");
};
module.exports = { insertproduct };

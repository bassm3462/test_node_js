const mongoose = require("mongoose");
const products = require("../model/Product_management");
const { response } = require("express");
const { error } = require("../validation/USERS");
const createProduct = async (req, res) => {
  const { name, departmentID, description, price, quantity } = req.body;
  console.log(req.body);
  console.log(req.user);
  const image = req.file.filename;
  console.log(image);
  if (
    !name ||
    !image ||
    !departmentID ||
    !description ||
    !quantity ||
    !price ||
    !quantity
  ) {
    return res.status(404).json({
      error: "Pleas Enter all information",
    });
  }
  const createProduct = new products({
    name,
    image,
    departmentID,
    description,
    price,
    UserID: req.user,
    quantity,
  });
  console.log("createproduct", createProduct);
  await createProduct
    .save()
    .then((response) => {
      res.status(200).json({ success: "add success", dataobj: createProduct });
    })
    .catch((error) => {
      res.status(404).json({ message: "Error Occurrence", error });
    });
};
const DisplayProducts = async (req, res) => {
  await products
    .find({ departmentID: req.params.id })
    .then((response) => {
      return res.status(200).json({ response });
    })
    .catch((error) => {
      return res.status(404).json({ error });
    });
};
const DispalyProductAndDepartment = async (req, res) => {
  await products
    .find()
    .populate("departmentID","name , Category ,description,-_id")
    .exec()
    .then((response) => {
      return res.status(200).json({ data: response });
    })
    .catch((error) => {
      return res.status(503).json({ message: "server Error" ,error});
    });
};
const DisplaySingleProduct = async (req, res) => {
  await products
    .findById(req.params.id)
    .then((response) => {
      return res.status(200).json({ response });
    })
    .catch((error) => {
      return res.status(404).json({ error, message: "" });
    });
};
const DeleteProduct = async (req, res) => {
  const DeletID = req.params.id;
  await products
    .findByIdAndRemove(DeletID)
    .then((response) => {
      return res
        .status(201)
        .json({
          response,
          message: `Delete Product${response.name} successfully`,
        });
    })
    .catch((error) => {
      return res.status(500).json({ error, message: "Internal Server Error" });
    });
};
const EditProduct = async (req, res) => {
  await products.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { name: req.body.name } }
  );
};
module.exports = {
  createProduct,
  DisplayProducts,
  DisplaySingleProduct,
  DeleteProduct,
  EditProduct,
  DispalyProductAndDepartment,
};

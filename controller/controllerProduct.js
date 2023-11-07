const products = require("../model/Product_management");
const ProcessorFile = require("../config/DeleteImage");
const Image = require("../model/Images");
const path = require("path");
const fs = require("fs");
const createProduct = async (req, res) => {
  const { name, departmentID, description, price, quantity } = req.body;
  console.log(req.body);
  const image=req.file.filename
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
    .find({ departmentID: req.params.id }).populate("departmentID")
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
    .populate("departmentID")
    .exec()
    .then((response) => {
      return res.status(200).json({ response });
    })
    .catch((error) => {
      return res.status(503).json({ message: "server Error", error });
    });
};
const DisplaySingleProduct = async (req, res) => {
  await products
    .findById(req.params.id).populate("departmentID").exec()
    .then((response) => {
      return res.status(200).json({ response });
    })
    .catch((error) => {
      return res.status(404).json({ error, message: "error display" });
    });
};
const DeleteProduct = async (req, res) => {
  const DeleteID = req.params.id;
  await products
    .findByIdAndDelete({DeleteID})
    .then(async (response) => {
      if (!response) {
        return res
          .status(404)
          .json({ message: "The product with the given ID was not found." });
      }
      const pathfile = path.join("upload_image_profile/", response.image);
      ProcessorFile(pathfile);

      res
        .status(201)
        .json({
          response,
          message: `Delete Product${response.name} successfully`,
        });
        
      const removeImage = await Image.findOne({ productID: response._id });
      if (!removeImage) {
        return res
          .status(404)
          .json({ message: "This Product don't have image in database" });
      }
      await Image.findByIdAndRemove(response._id).then((response) => {
        if (!response) {
          return res
            .status(404)
            .json({ message: "The product with the given ID was not found." });
        }
        response.image.map((file) => {
          const pathUpload = path.join(`upload_image_profile/${file.filename}`);
          if (fs.existsSync(pathUpload)) {
            const DeletFile = fs.unlinkSync(pathUpload);
            if (!DeletFile) {
              console.log("Deleted", pathUpload, "Success");
            } else {
              console.log(`Not Found ${pathUpload}`);
            }
          } else {
            res.status(404).json({
              message: `File not found`,
            });
          }
        });
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

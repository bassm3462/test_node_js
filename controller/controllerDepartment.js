const mongoose = require("mongoose");
const Department = require("../model/Department_management ");
const { response } = require("express");
const { error } = require("../validation/USERS");
const path = require("path");
const fs = require("fs");
const ProcessorFile = require("../config/DeleteImage");
// create department
const DepartmentInfo = async (req, res) => {
  const { name, Category, description } = req.body;
  if (!req.file) {
    return res.status(404).json({ message: "image not found" });
  }

  const image = req.file.filename;
  if (!name || !Category || !description || !image) {
    return res.status(400).json({ error: "Pleas Enter all info " });
  }
  const createDepartment = new Department({
    name,
    Category,
    description,
    image,
  });
  await createDepartment
    .save()
    .then((response) => {
      res.status(200).json({ message: "department created", response });
    })
    .catch((error) => {
      res.status(400).json({ error: "invalid info" });
    });
};
// end create
const show_Details = async (req, res) => {
  await Department.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(501).json({ message: "invalid department" });
    });
};
const DepartmentDispalay = async (req, res) => {
  await Department.findById(req.params.id)
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(501).json({ message: "invalid Department display" });
    });
};
const Delete = (req, res) => {
  const Delete = Department.findByIdAndRemove(req.params.id)
    .exec()
    .then((response) => {
      if (!response) {
        return res.status(500).json({ message: "not found" });
      }
      const pathfile = path.join("upload_image_profile/", response.image);
      deletefile(pathfile);
      res
        .status(200)
        .json({ data: { response }, message: "deleted successfully" });
    })
    .catch((error) => {
      console.log("error", error);
    });
  function deletefile(pathfile) {
    if (fs.existsSync(pathfile)) {
      fs.unlink(pathfile, (error) => {
        if (!error) {
          console.log("File deleted successfully");
        } else {
          throw new Error();
        }
      });
    } else {
      res.status(404).json({ error: "file dos not exit", path });
    }
  }
};

const EditDepartment = async (req, res) => {
  const DepartmentID = req.params.id;
  const { name, Category, description } = req.body;
  await Department.findByIdAndUpdate(
    { _id: DepartmentID },
    {
      $set: {
        name: name,
        Category: Category,
        description: description,
      },
    },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        return res.status(500).json({ message: "Not Found" });
      }
      res.status(200).json({ response, message: "Update successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Update failed ", error });
    });
};
const EditFile = async (req, res) => {
  console.log("edit file", req.file.filename, req.body);
  if (!req || !req.file) {
    return res.status(404).json({ message: "Pleas Select image" });
  }
  const imageEdit = req.body.imageEdit;
  console.log(imageEdit);
  await Department.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { image: req.file.filename } }
  )
    .exec()
    .then((response) => {
      const pathfile = path.join("upload_image_profile/", imageEdit);
      ProcessorFile(pathfile);
      res.status(200).json({ message: "update image successfully" });
    })
    .catch((error) => {
      res.status(404).json({ message: "felid update image" });
    });
};

module.exports = {
  DepartmentInfo,
  show_Details,
  Delete,
  EditDepartment,
  EditFile,
  DepartmentDispalay,
};

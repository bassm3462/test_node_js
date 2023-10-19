const { response } = require("express");
const Services = require("../model/Services");

const AddServices = (req, res) => {
  const { Title, Description } = req.body;
  if (!Services) {
    return res.status(401).json({ msg: "Please enter the content" });
  }
  const newServices = new Services({
    Title,
    Description,
    Image: req.file.filename,
  });
  newServices
    .save()
    .then((response) => {
      res.status(200).json({ message: "Added successfully", response });
    })
    .catch((err) => {
      res.status(400).json({ err, message: "invalid" });
    });
};
const getServices = (req, res) => {
  Services.find()
    .then((response) => {
      if (response == null || !response[0]) {
        return res.status(500).json({ error: true });
      } else {
        return res.status(200).json({ data: response, success: "true" });
      }
    })
    .catch((err) => {
      return res.status(400).json({message:"An error occurred"})
    });
};
const DeleteSericesById = async (req, res) => {
  const id = req.params.id;
  await Services.findByIdAndRemove(id)
    .then((response) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: "not deleted", error });
    });
};
const EditServices = async (req, res) => {
  await Services.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        Title: req.body.Title,
        Description: req.body.Description,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "updated" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Deleted" });
    });
};
module.exports = { AddServices, getServices, DeleteSericesById,EditServices };

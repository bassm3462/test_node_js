const Offers = require("../model/Offers");
const ProcessorFile = require("../config/DeleteImage");
const Image = require("../model/Images");
const path = require("path");
const fs = require("fs");
const moment = require('moment');
const AddOffers = async (req, res) => {
    const { DepartmentID, price, discount, description, quantity, Title } = req.body;
    console.log(req.body);
    const UserID = req.user
    console.log(UserID)
    const image = req.file.filename;
    console.log(image)
    if (
        !image ||
        !DepartmentID ||
        !description ||
        !price ||
        !Title
    ) {
        return res.status(404).json({
            error: "Pleas Enter all information",
        });
    }
    if (isNaN(quantity) || isNaN(price) || isNaN(discount)) {
        return res.status(400).json({ message: "Invalid Please Enter Number" });
    }
    const currentDate = new Date();
    const createOffers = new Offers({
        UserID,
        image,
        DepartmentID,
        description,
        price,
        UserID: req.user,
        discount,
        Title,
        currentDate
    });
    await createOffers
        .save()
        .then((response) => {
            res.status(200).json({ message: "add success", response });
        })
        .catch((error) => {
            res.status(404).json({ message: "Error Occurrence", error });
        });
};
const getAllOffers = async (req, res) => {
    await Offers.find().populate('DepartmentID', "_id , image , name").exec().then(
        response => {
            if (!response) {
                throw Error('No offer found')
            }
            return res.status(200).json(response)
        }
    ).catch(error => {
        return res.status(500).send("server error")
    })

    // console.log(response);
}
module.exports = { AddOffers, getAllOffers };

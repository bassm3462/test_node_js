const Chats = require("../model/Chat")
const mongoose = require("mongoose");
const AddMessage = async (req, res) => {
    const { message } = req.body;
    const departmentID = req.DepartmentID.id;
    try {
        let response = await Chats.findOne({ Department: DepartmentID });
        if (!response) {
            chat = new Chats({
                departmentID,
                message,
            })
        }
        await response.save();
        res.status(201).json({ response })
    } catch (err) {
        res.status(400).json({ err, message: "error occurrence" })
    }
}
const getMessage = async (req, res) => {
    const departmentId = req.params.id
    try {
        let response = await Chats.find({ departmentID:departmentId })
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Occurred' })
    }
}
module.exports = { AddMessage,getMessage }
const  mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    message: String,
})
const Chats = mongoose.model("Chats", ChatSchema)
module.exports= Chats;

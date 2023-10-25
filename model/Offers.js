const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    Title:String,
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    DepartmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    description: String,
    price: Number,
    discount:{
        type :Number ,
        default : "1"
    },
    image: String,
    quantity:{
        type :Number ,
        default:"1"
    },
    currentDate:{
        type:Date,
     },
     Like:{
       type:Boolean,
       default:false
     }
})
const Offers = mongoose.model("Offers", OfferSchema)
module.exports = Offers;

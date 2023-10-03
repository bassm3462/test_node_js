const { boolean } = require("joi");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const DepartmentSchema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type: String,
        required:true},
    Category:{type:String,required:true},
    description: {type:String,required:true},
},{
    timestamps: true
});
const Department=new mongoose.model("Department",DepartmentSchema);
module.exports=Department
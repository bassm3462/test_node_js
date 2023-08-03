const joi=require("@hapi/joi")

const Schema=joi.object({
    name:joi.string().min(3).max(50).required(),
    email :joi.string().email().required(),
    password:joi.string().min(8).required(),
})
module.exports=Schema;
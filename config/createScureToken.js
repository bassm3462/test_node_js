require("dotenv").config();
const jwt = require("jsonwebtoken");

 const CreateToken= (id) => {
  return jwt.sign({ id }, "tokenID", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
module.exports=CreateToken;
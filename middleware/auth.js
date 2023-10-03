const jwt = require("jsonwebtoken");
const check_user = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    var decoded = jwt.verify(token, "tokenID");
    req.user = decoded.id;
    // console.log("decoded",req.user);

    next();
  } catch (err) {
    // console.error(err,'error');
    return res.status(500).json({
      error: err,
    });
  }
};
module.exports = check_user;

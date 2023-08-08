const jwt = require("jsonwebtoken");
const check_user = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    var decoded = jwt.verify(token, "tokenID");
    // console.log("decoded", decoded._id);
    req.user = decoded._id;
    next();
  } catch (err) {
    //console.error(err,'error');
    return res.status(500).json({
      error: err,
    });
  }
};
module.exports = check_user;

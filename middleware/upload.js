const multer = require("multer");
const path = require("path");
const storage =  multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination")
    cb(null, "upload_image_profile/");
  },
  filename: (req, file, cb) => {
    const ext =   path.extname(file.originalname);
    console.log(ext)
    cb(null, file.fieldname + Date.now() + "_" + ext);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const upload = multer({
  storage,
});
console.log(storage.filename)
module.exports = upload;

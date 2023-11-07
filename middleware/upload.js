const multer = require("multer");
const path = require("path");
const storage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_image_profile/");
  },
  filename: (req, file, cb) => {
    const ext =   path.extname(file.originalname);
    console.log(ext)
    cb(null, file.fieldname + Date.now() + "_" + ext);
  },
});
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };



const upload = multer({
  storage,
});
const storage2 =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imageDetails/");
  },
  filename: (req, file, cb) => {
    const ext =   path.extname(file.originalname);
    console.log(ext)
    cb(null, file.fieldname + Date.now() + "_" + ext);
  },
});

const uploadDetails = multer({
  storage:storage2,
});
module.exports = {upload,uploadDetails};

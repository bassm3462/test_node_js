const { executionAsyncId } = require("async_hooks");
const { error } = require("console");
const express = require("express");
require("express-async-errors")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const path = require("path")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler,notFound } = require("./middleware/errorHandel");
const dotenv = require("dotenv");
const logger = require("./config/logger")
dotenv.config()
const App = express();
App.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
App.use(express.json());
const port =  process.env.PORT;
mongoose
  .connect(process.env.CONECT)
  .then(() => {
    console.log("connection");
  })
  .catch((error) => {
    logger.error("failed", error);
  });
const jsonParser = bodyParser.json()
App.use(errorHandler)
App.use(cookieParser());
App.use(bodyParser.urlencoded({ extended: false }))
App.use(express.static(path.join(__dirname, "upload_image_profile/")));
App.use("/api/", require("./route/UsersR"));
App.use("/api/", require("./route/DepartmentR"));
App.use("/api/", require("./route/EmployR"));
App.use("/api/",require("./route/ProductR"))
App.use("/api/",require("./route/UplaodeImagesR"))
App.use("/api/",require("./route/AboutR"))
App.use("/api/",require("./route/ServicesR"))
App.use("/api/",require("./route/Chat"))
App.use("/api/",require("./route/Offers"))
App.get("/", (req, res) => {
  res.send("<h1>Welcome to my API middleware</h1>");
});
App.all("*", (req, res) => {
  return res.status(404).json({ mesage: "not found route " })
})

App.listen(port, (req, res) => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

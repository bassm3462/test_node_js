const { executionAsyncId } = require("async_hooks");
const { error } = require("console");
const express = require("express");
require("express-async-errors")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const path = require("path")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorHandel");
const dotenv = require("dotenv");
const logger = require("./config/logger")
dotenv.config()
const App = express();
App.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
App.use(express.json());
const port = 4000;
mongoose
  .connect(process.env.CONECT)
  .then(() => {
    console.log("connection");
  })
  .catch((error) => {
    logger.error("failed", error);
  });
const jsonParser = bodyParser.json()
App.use((req, res, next) => {
  // res.setHeader(" Access-Control-Allow-Origin","*" );
  // res.header("Access-Control-Allow-Methods",'GET,PUT,POST',
  // "Access-Control-Allow-Headers",'Content-Type' ,'Accept','X-Requested-With');
  next()
});
App.use(errorHandler)
App.use(cookieParser());
App.use(bodyParser.urlencoded({ extended: false }))
App.use(express.static(path.join(__dirname, "upload_image_profile/")));
App.use("/api/", require("./route/Rourte_Users"));
App.use("/api/", require("./route/Department"));
App.use("/api/", require("./route/Employ"));
App.use("/api/",require("./route/Product"))
App.use("/api/",require("./route/UplaodeImages"))


App.all("*", (req, res) => {
  return res.status(404).json({ mesage: "not found route " })
})
App.get("/", (req, res) => {
  res.send("<h1>Welcome to my API middleware</h1>");
});
App.listen(port, (req, res) => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

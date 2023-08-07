const { executionAsyncId } = require("async_hooks");
const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const App = express();
App.use(cors());
App.use(express.json());
const port = 4000;
const password = process.env.PASSSWORD;
// console.log(password)
mongoose
  .connect(
    "mongodb+srv://hbasseim8:FjWQqA0Nl7q5Su7h@cluster0.opbwfoc.mongodb.net/login"
  )
  .then(() => {
    console.log("connection");
  })
  .catch((error) => {
    console.log("failed", error);
  });
App.use(express.static("upload_image_profile/"));
App.use("/api/", require("./route/Rourte_Users"));
App.get("/", (req, res) => {
  res.send("<h1>Welcome to my API middleware</h1>");
});
App.listen(port, (req, res) => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

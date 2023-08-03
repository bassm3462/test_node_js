const { error } = require("console");
const express=require("express");
const mongoose=require("mongoose")
const App=express()
App.use(express.json());
const port=4000;
// mongoose.connect("mongodb://localhost:27017/login").then(console.log("connection")).catch(error=>{
//     console.log("failed",error)
// })
App.use("/api/",require("./route/Rourte_Users"))
App.get("/",(req,res)=>{
    res.send("<h1>Welcome to my API middleware</h1>")
})
App.listen(port,(req,res)=>{
    console.log(`Server is running on http://127.0.0.1:${port}`)
}) 

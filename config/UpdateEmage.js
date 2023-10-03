const path = require("path");
const fs = require("fs");
 const ProcessorFile=(pathfile)=>{
    try{
      console.log("helloooo")
      console.log(pathfile)
    if (fs.existsSync(pathfile)) {
      fs.unlink(pathfile, (error) => {
        if (!error) {
          console.log("File deleted successfully");
        } else {
          return new Error();
        }
      });
    } else {
      res.status(404).json({ error: "file dos not exit", path });
    }
}catch (error) {
  console.log("update image profile", error.message);
}
}
module.exports=ProcessorFile
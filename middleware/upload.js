const multer=require("multer")
const path=require("path")
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload_image_profile/')
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null,file.fieldname+Date.now()+"_"+ext)
    }
})
const upload =multer({
    storage
})
module.exports=upload;
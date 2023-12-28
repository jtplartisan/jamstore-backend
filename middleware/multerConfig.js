const cloudinary  = require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary')
require('dotenv').config()
const base = process.env
const multer = require('multer');

cloudinary.config({
    cloud_name: base.CLOUD_NAME,
    api_key:base.API_KEY,
    api_secret:base.API_KEY 
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{   
        
        folder:'products',
        allowed_formats:['jpg', 'png', 'jpeg']
    }
})

exports.multerCloudinary = multer({storage:storage})
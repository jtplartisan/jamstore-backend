const express = require('express');
const {  getCategory, createProduct, getProduct, deleteProduct, getCategoryById } = require('../controllers/vendor/shop.vendor');
const upload = require('../helpers/multer.helper');
const { authVendor } = require('../middleware/authProtect');

const router = express.Router();


router.get('/get-categories', getCategory );
router.post('/post-product' , authVendor, upload.single("image") , createProduct)
router.get('/get-product/:ownerId',getProduct)
router.delete('/delete-product/:productId',authVendor,deleteProduct)
router.get('/get-category/:categoryId',authVendor,getCategoryById)
  
module.exports= router;
  
const express = require('express');
const { authVendor } = require('../middleware/authProtect');
const { addProduct } = require('../controllers/vendor/shop.vendor');
const router = express.Router();

router.get('/add-product',authVendor, addProduct);

module.exports= router;

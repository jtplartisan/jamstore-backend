const express = require('express');
const {  getCategory,postProduct } = require('../controllers/vendor/shop.vendor');
const router = express.Router();

router.get('/get-categories', getCategory);
router.post('/post-product', postProduct);

module.exports= router;

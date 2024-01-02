const express = require('express');
const { authUser } = require('../middleware/authProtect');
const { getAllProducts } = require('../controllers/user/products.controller');
const { addToCart } = require('../controllers/user/order.controller');

const router = express.Router();

router.get('/products',  getAllProducts);

module.exports= router;

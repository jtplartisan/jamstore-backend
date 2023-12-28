const express = require('express');
const { authAdmin } = require('../middleware/authProtect');
const { postCategories, getCategories } = require('../controllers/admin/category.controller');
const router = express.Router();

router.post('/categories', authAdmin, postCategories);
router.get('/categories', authAdmin, getCategories);

module.exports= router;

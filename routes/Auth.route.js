const express = require('express');
const { register, login, adminPosts } = require('../controllers/auth.controller');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);


module.exports= router;

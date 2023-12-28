const express = require('express');
const { authUser } = require('../middleware/authProtect');

const router = express.Router();

router.get('/', authUser, (req, res) => {
    res.json({ message: ' user route' });
  });

module.exports= router;

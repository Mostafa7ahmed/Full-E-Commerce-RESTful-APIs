
const express = require('express');
const router = express.Router();
const { getCategories } = require('../services/category.service');

router.get('/', getCategories);
module.exports = router;
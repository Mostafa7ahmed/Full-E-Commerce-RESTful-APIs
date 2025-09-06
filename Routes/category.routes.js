
const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../services/category.service');

// router.get('/', getCategories);
// router.post('/', createCategory);
// solove the problem of image upload later
router.route('/')
  .get(getCategories)
  .post(createCategory)
   
module.exports = router;
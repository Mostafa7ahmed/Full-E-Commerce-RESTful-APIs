
const express = require('express');
const router = express.Router();
const { getCategories, createCategory , getCategory, updateCategory } = require('../services/category.service');

// router.get('/', getCategories);
// router.post('/', createCategory);
// solove the problem of image upload later
router.route('/')
  .get(getCategories)
  .post(createCategory)

router.route('/:id')
  .get(getCategory)
  .put(updateCategory)


  
module.exports = router;
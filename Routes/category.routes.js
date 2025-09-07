
const express = require('express');
const router = express.Router();
const { getCategories, createCategory , getCategory, updateCategory, deleteCategory } = require('../services/category.service');

// router.get('/', getCategories);
// router.post('/', createCategory);
// solove the problem of image upload later
router.route('/')
  .get(getCategories)
  .post(createCategory)

router.route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)


  
module.exports = router;
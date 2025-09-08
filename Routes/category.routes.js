
const express = require('express');
const router = express.Router();
const { getCategories, createCategory , getCategory, updateCategory, deleteCategory } = require('../services/category.service');
const subcategoryRoutes = require('./subCategory.routes');

const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validator/categoryvalidator');
router.route('/')
  .get(getCategories)
  .post(createCategoryValidator ,createCategory)
router.route('/:id')
  .get(getCategoryValidator,getCategory)
  .put(updateCategoryValidator , updateCategory)
  .delete(deleteCategoryValidator, deleteCategory)

router.use('/:categoryId/subcategories' , subcategoryRoutes)
  
module.exports = router;
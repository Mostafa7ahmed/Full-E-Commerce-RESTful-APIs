

const express = require('express');
const router = express.Router();
const {createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory   } = require("../services/subCategory.service");
const { createSubCategoryValidator, getSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator} =  require("../utils/validator/subCategoryvalidator")
router.route('/')
  .get(getSubCategories)
  .post(createSubCategoryValidator , createSubCategory)
router.route('/:id')
  .get(getSubCategoryValidator,getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)

  module.exports = router;
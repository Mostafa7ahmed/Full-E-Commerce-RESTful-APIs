

const express = require('express');
const router = express.Router({
    mergeParams:true
});
const {createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory, setCategoryIdToBody  ,createFilterObj } = require("../services/subCategory.service");
const { createSubCategoryValidator, getSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator} =  require("../utils/validator/subCategoryvalidator")
router.route('/')
.post(setCategoryIdToBody ,createSubCategoryValidator , createSubCategory)
  .get(createFilterObj ,getSubCategories)
router.route('/:id')
  .get(getSubCategoryValidator,getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)

  module.exports = router;
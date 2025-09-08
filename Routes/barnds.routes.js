
const express = require('express');
const router = express.Router();
const {createBrand ,deleteBrand , updateBrand , getBrands , getBrand} = require("../services/Brand.service");
const {createBrandsValidator , getBrandsValidator , updateBrandsValidator , deleteBrandsValidator } = require("../utils/validator/brandsvalidator")

router.route('/')
  .get(getBrands)
  .post(createBrandsValidator ,createBrand)
router.route('/:id')
  .get(getBrandsValidator,getBrand)
  .put(updateBrandsValidator , updateBrand)
  .delete(deleteBrandsValidator, deleteBrand)

  
module.exports = router;
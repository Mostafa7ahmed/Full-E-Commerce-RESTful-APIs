const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  deleteProduct,  
  getProducts, 
  updateProduct, 
  getProduct  
} = require('../services/products.service');

const { 
  createProductValidator, 
  deleteProductValidator, 
  updateProductValidator, 
  getProductValidator
} = require('../utils/validator/productValidator');

router.route('/')
  .get(getProducts)
  .post(createProductValidator, createProduct);

router.route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const advancedResults = require('../middlewares/advancedResults');

// Product controllers
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  setDiscounts,
  deleteDiscounts
} = require('../controllers/products');

// Route protection
const {
  protect,
  authorize
} = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Product), getProducts)
  .post(protect, authorize('admin'), createProduct);

router
  .route('/discount')
  .post(protect, authorize('admin'), setDiscounts)
  .delete(protect, authorize('admin'), deleteDiscounts)

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);


module.exports = router;
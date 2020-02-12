const express = require('express');
const router = express.Router();
const {
  protect,
  authorize
} = require('../middlewares/auth');
const Order = require('../models/Order');
const advancedResults = require('../middlewares/advancedResults');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  refund
} = require('../controllers/orders');

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(advancedResults(Order, {
    path: 'user',
    select: 'firstname lastname email address'
  }), getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

router.post('/refund/:id', refund);


module.exports = router;
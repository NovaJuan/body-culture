const express = require('express');
const router = express.Router();
const {
  protect
} = require('../middlewares/auth');
const settingCart = require('../middlewares/settingCart');
const {
  createCheckout_stripe
} = require('../controllers/checkout_stripe');

const emptyCart = (req, res, next) => {
  if (req.cart.items.length < 1) {
    return next(new ErrorResponse(`No items in your cart`, 401));
  }
  next();
}

router.use(protect);

router.use(settingCart);

router.use(emptyCart);

router.route('/stripe')
  .post(createCheckout_stripe)

module.exports = router;
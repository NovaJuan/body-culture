const express = require('express');
const router = express.Router();
const {
  setUser,
} = require('../middlewares/auth');
const settingCart = require('../middlewares/settingCart');
const {
  addToCart,
  addOne,
  reduceOne,
  removeItem,
  getCart
} = require('../controllers/cart');

// Set user on req object
router.use(setUser);

// Set cart on req object
router.use(settingCart);

router.route('/')
  .get(getCart)
  .post(addToCart);

router.put('/add/:itemId', addOne);
router.put('/reduce/:itemId', reduceOne);
router.put('/remove/:itemId', removeItem);

module.exports = router;
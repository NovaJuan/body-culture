const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const settingCart = asyncHandler(async (req, res, next) => {
	let cartID;

	if (req.headers['cart-id']) {
		cartID = req.headers['cart-id'];
	} else if (req.cookies['cart-id']) {
		cartID = req.cookies['cart-id'];
	}

	let cart;

	if (req.user) {
		cart = await Cart.findOne({
			user: req.user._id.toString()
		});
	}

	if (!cart && cartID) {
		cart = await Cart.findOne({
			clientID: cartID
		});
		if (cart && cart.user) {
			cart = null;
		}
	}

	const route = `${req.method} ${req.originalUrl}`;

	if (!cart && route !== 'POST /api/v1/cart') {
		return next(new ErrorResponse(`No cart`, 404));
	}

	if (!cart) {
		cart = new Cart();
	}

	if (cart && req.user && !cart.user) {
		cart.user = req.user._id;
		cart = await cart.save();
	}

	req.cart = cart;

	next();
});

module.exports = settingCart;

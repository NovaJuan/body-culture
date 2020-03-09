const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const Cart = require('../models/Cart');
const Product = require('../models/Product');

//@desc       Get cart
//@route      GET /api/v1/cart/
//@access     Public
exports.getCart = asyncHandler(async (req, res, next) => {
	const cart = await req.cart.getCart();

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXP_DAYS * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	if (req.cart.items.length < 1) {
		await req.cart.remove();
		return next(new ErrorResponse(`No Cart`, 401));
	}

	res
		.cookie('cart-id', req.cart.clientID, cookieOptions)
		.status(200)
		.json({
			success: true,
			data: cart,
			cart: req.cart.clientID
		});
});

//@desc       Add item to cart
//@route      POST /api/v1/cart/
//@access     Public
exports.addToCart = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.body.productID);

	if (!product) {
		return next(
			new ErrorResponse(`No product with id of ${req.body.productID}`, 404)
		);
	}

	await req.cart.addToCart(req.body);
	sendCartResponse(req, res, 201);
});

//@desc       Add one to existing item
//@route      PUT /api/v1/cart/add/:itemId
//@access     Public
exports.addOne = asyncHandler(async (req, res, next) => {
	const clientID = await req.cart.addOne(req.params.itemId);
	req.cart.clientID = clientID;
	sendCartResponse(req, res, 200);
});

//@desc       Reduce one to existing item
//@route      PUT /api/v1/cart/reduce/:itemId
//@access     Public
exports.reduceOne = asyncHandler(async (req, res, next) => {
	const clientID = await req.cart.reduceOne(req.params.itemId);
	req.cart.clientID = clientID;
	sendCartResponse(req, res, 200);
});

//@desc       Remove existing item
//@route      PUT /api/v1/cart/remove/:itemId
//@access     Public
exports.removeItem = asyncHandler(async (req, res, next) => {
	const { clientID } = await req.cart.removeItem(req.params.itemId);
	req.cart.clientID = clientID;
	await req.cart.removeItem(req.params.itemId);
	sendCartResponse(req, res, 200);
});

const sendCartResponse = (req, res, statusCode) => {
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXP_DAYS * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	res
		.status(statusCode)
		.cookie('cart-id', req.cart.clientID, cookieOptions)
		.json({
			success: true,
			cart: req.cart.clientID
		});
};

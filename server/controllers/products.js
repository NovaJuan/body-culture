const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const filesHandler = require('../utils/filesHandler');

//@desc       Get all products
//@route      GET /api/v1/products
//@access     Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

//@desc       Get single product
//@route      GET /api/v1/products/:id
//@access     Public
exports.getProduct = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	let product = null;
	if (id.length > 8) {
		product = await Product.findById(id);
	} else {
		product = await Product.findOne({ id });
	}

	if (!product) {
		return next(new ErrorResponse(`No product with id ${id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: product
	});
});

//@desc       Create product
//@route      POST /api/v1/products
//@access     Private/admin
exports.createProduct = asyncHandler(async (req, res, next) => {
	// Discount only can be set by percent
	if (req.body.discountPrice) {
		return next(new ErrorResponse(`Discount only can be set by percent`, 400));
	}

	// discount price can not be more than price
	if (req.body.discountPercent > 100 || req.body.discountPercent < 0) {
		return next(
			new ErrorResponse(
				'Discount percent can not be more than 100% and less than 0%',
				400
			)
		);
	}

	// If there are variations and are strings
	if (req.body.variations && typeof req.body.variations == 'string') {
		req.body.variations = JSON.parse(req.body.variations);
	}

	//formatting price
	if (req.body.price) {
		req.body.price = Math.ceil(req.body.price * 100);
	}

	let product = new Product(req.body);

	if (req.files) {
		return filesHandler(req, res, product);
	}

	await product.save();

	res.status(201).json({
		success: true,
		data: product
	});
});

//@desc       Update product
//@route      PUT /api/v1/products/:id
//@access     Private/admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`No product with id of ${req.params.id}`, 400)
		);
	}

	// Discount only can be set by percent
	if (req.body.discountPrice) {
		return next(new ErrorResponse(`Discount only can be set by percent`, 400));
	}

	// discount price can not be more than price
	if (req.body.discountPercent > 100 || req.body.discountPercent < 0) {
		return next(
			new ErrorResponse(
				'Discount percent can not be more than 100% and less than 0%',
				400
			)
		);
	}

	if (req.body.discountPercent) {
		req.body.discountPercent = Math.round(req.body.discountPercent);
	}

	//formatting price
	if (req.body.price) {
		req.body.price = req.body.price * 100;
	}

	// If there are variations and are strings
	if (req.body.variations && typeof req.body.variations == 'string') {
		req.body.variations = JSON.parse(req.body.variations);
	}

	product.set({
		...req.body
	});

	if (req.files) {
		return filesHandler(req, res, product);
	}

	product = await product.save();

	res.status(200).json({
		success: true,
		data: product
	});
});

//@desc       Delete product
//@route      DELETE /api/v1/products/:id
//@access     Private/admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`No product with id of ${req.params.id}`, 400)
		);
	}

	product = await product.remove();

	res.status(200).json({
		success: true,
		data: `${product.name} was deleted`
	});
});

//@desc       Set discounts
//@route      POST /api/v1/products/discount
//@access     Private/admin
exports.setDiscounts = asyncHandler(async (req, res, next) => {
	await Product.setManyDiscounts(req.body.ids, req.body.discountPercent);

	res.status(200).json({
		success: true,
		data: `Discount of ${req.body.discountPercent} has been setted`
	});
});

//@desc       delete discounts
//@route      DELETE /api/v1/products/discount
//@access     Private/admin
exports.deleteDiscounts = asyncHandler(async (req, res, next) => {
	// Pass array of _id's
	await Product.deleteManyDiscounts(req.body.ids);

	res.status(200).json({
		success: true,
		data: `Discounts has been deleted`
	});
});

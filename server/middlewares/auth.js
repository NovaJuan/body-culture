const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}

	//Make sure token exists
	if (!token) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}

	let id;
	try {
		id = jwt.verify(token, process.env.JWT_SECRET).id;
	} catch (err) {
		return next(new ErrorResponse(`Not authorized to access this route`, 401));
	}

	req.user = await User.findById(id);

	if (!req.user) {
		return next(new ErrorResponse(`Not authorized to access this route`, 401));
	}

	next();
});

// Authorize to access to route (example: authorize('admin'))
exports.authorize = (...roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return next(new ErrorResponse(`Not authorized to access this route`, 401));
	}
	next();
};

exports.setUser = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return next();
	}

	let id;
	try {
		id = jwt.verify(token, process.env.JWT_SECRET).id;
	} catch (err) {
		return next();
	}

	req.user = await User.findById(id);

	next();
});

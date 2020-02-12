const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const mailSender = require('../utils/mailSender');

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
	let user = await User.findOne({
		email: req.body.email
	});

	if (user) {
		return next(new ErrorResponse(`${req.body.email} is taken`, 400));
	}

	// Deleting critical fields
	delete req.body.role;
	delete req.body.triesToAccess;
	delete req.body.resetPasswordToken;
	delete req.body.resetPasswordTokenExpiration;

	user = await User.create(req.body);

	sendTokenResponse(user, 201, res, req);
});

//@desc     Log in user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return next(new ErrorResponse('Missing fields', 400));
	}

	let user = await User.findOne({
		email: req.body.email
	}).select('+password');

	// Verify if user exists
	if (!user) {
		return next(new ErrorResponse(`Invalid Credentials`, 400));
	}

	if (user.triesToAccess < 1) {
		return accountBlocked(req, res, next, user);
	}

	// Verify password
	if (!(await user.verifyPassword(req.body.password))) {
		user.triesToAccess -= 1;
		await user.save({
			validateBeforeSave: false
		});
		return next(new ErrorResponse(`Invalid credentials`, 400));
	}

	const cart = await Cart.findOne({ user: user._id });
	if (cart) {
		req.cart = cart.clientID;
	}

	user.triesToAccess = 10;
	sendTokenResponse(user, 200, res, req);
	await user.save();
});

//@desc     Log out user
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.clearCookie('cart-id');
	res.clearCookie('token');

	res.status(200).json({
		success: true,
		data: {}
	});
});

//@desc     Update user details
//@route    PUT /api/v1/auth/update
//@access   Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.user._id);

	if (!user) {
		return next(new ErrorResponse(`No user info with id ${req.user._id}`, 404));
	}

	// Deleting critical fields
	delete req.body.role;
	delete req.body.triesToAccess;
	delete req.body.resetPasswordToken;
	delete req.body.resetPasswordTokenExpiration;
	delete req.body.password;

	user.set({
		...req.body
	});

	user = await user.save({
		validateBeforeSave: true
	});

	res.status(200).json({
		success: true,
		data: user
	});
});

//@desc     Get user info
//@route    GET /api/v1/auth/me
//@access   Private
exports.getMe = asyncHandler(async (req, res, next) => {
	let query = User.findOne({
		_id: req.user._id
	});

	query = query.populate('orders');

	const user = await query;

	if (!user) {
		return next(new ErrorResponse(`No user info with id ${req.user._id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: user
	});
});

//@desc     Get password recovery token to user
//@route    POST /api/v1/auth/forgotpassword
//@access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({
		email: req.body.email
	});

	if (!user) {
		return next(
			new ErrorResponse(`user ${req.body.email} does not exists`, 404)
		);
	}

	const recoveryToken = await user.createRecoveryToken();

	const recoveryURL =
		process.env.NODE_ENV === 'production'
			? `${req.protocol}://${req.headers.host}/resetpassword/${recoveryToken}`
			: `${req.protocol}://${req.headers.host}/api/v1/auth/resetpassword/${recoveryToken}`;

	const mail = {
		to: req.body.email,
		subject: 'Reset password request',
		message: `You (or somebody else) requested a password reset, make a PUT request with your new password in the body to this route => ${recoveryURL}`
	};

	try {
		await mailSender(mail);
	} catch (err) {
		console.log(err);

		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiration = undefined;

		await user.save({
			validateBeforeSave: false
		});

		return next(
			new ErrorResponse(
				`Something went wrong setting your reset password reset. Please, try again`,
				500
			)
		);
	}

	res.status(200).json({
		success: true,
		data: `An email with your reset password token was sent to ${req.body.email}`
	});
});

//@desc     Reset user password
//@route    PUT /api/v1/auth/recoverypassword/:resetToken
//@access   Public
exports.recoveryPassword = asyncHandler(async (req, res, next) => {
	const resetToken = crypto
		.createHash('sha512')
		.update(req.params.resetToken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken: resetToken
	});

	if (!user) {
		return next(new ErrorResponse(`Recovery token is invalid`, 401));
	}

	if (user.resetPasswordTokenExpiration < Date.now()) {
		user.resetPasswordTokenExpiration = undefined;
		user.resetPasswordToken = undefined;

		await user.save({
			validateBeforeSave: false
		});

		return next(new ErrorResponse(`Recovery token is expired`, 401));
	}

	user.resetPasswordTokenExpiration = undefined;
	user.resetPasswordToken = undefined;
	user.password = req.body.newPassword;
	user.triesToAccess = 10;

	await user.save();

	res.status(200).json({
		success: true,
		data: `Password changed.`
	});
});

const sendTokenResponse = (user, status, res, req) => {
	let token = user.getAuthorizationToken();

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXP_DAYS * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true;
	}

	res.cookie('token', `Bearer ${token}`, cookieOptions);

	if (req.cart) {
		res.cookie('cart-id', req.cart, cookieOptions);
	}

	res
		.status(status)
		.cookie('token', token, cookieOptions)
		.json({
			success: true,
			token,
			cart: req.cart && req.cart,
			isAdmin: user.role === 'admin'
		});
};

const accountBlocked = async (req, res, next, user) => {
	const recoveryToken = await user.createRecoveryToken();

	const recoveryURL =
		process.env.NODE_ENV === 'production'
			? `${req.protocol}://${req.headers.host}/resetpassword/${recoveryToken}`
			: `${req.protocol}://${req.headers.host}/api/v1/auth/resetpassword/${recoveryToken}`;

	const mail = {
		to: req.body.email,
		subject: 'Account blocked',
		message: `You (or somebody else) tried more than 10 times to access to your account, so our team blocked your account for security, go to this url to unlock your account by changing your password => ${recoveryURL}`
	};

	try {
		await mailSender(mail);
	} catch (err) {
		console.log(err);
		return next(
			new ErrorResponse(`Something went wrong. Please, try again`, 500)
		);
	}

	return next(
		new ErrorResponse(
			`Sorry but for security we blocked your account because you tried to access more than 10 times, to access again we sent an email to your account so you can change your password and unlock it`,
			400
		)
	);
};

//@desc     Get user order
//@route    GET /api/v1/auth/order/:id
//@access   Private
exports.getOrder = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const order = await Order.findOne({ _id: id, user: req.user._id });

	if (!order) {
		return next(new ErrorResponse('No order found.', 401));
	}

	res.status(200).json({
		success: true,
		data: order
	});
});

//@desc     Change user password
//@route    PUT /api/v1/auth/changepass
//@access   Private
exports.changePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id).select('+password');
	const isMatch = await user.verifyPassword(req.body.old_password);
	console.log(req.body);

	if (!isMatch) {
		return next(new ErrorResponse("Old password doesn't match.", 400));
	}

	user.set({ password: req.body.new_password });
	await user.save({ validateBeforeSave: true });

	res.status(200).json({
		success: true,
		data: {}
	});
});

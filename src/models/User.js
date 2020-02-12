const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const geocoder = require('../utils/geocoder');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
			maxlength: 50
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			match: [
				/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
				'Please use a valid email'
			]
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
			minlength: [6, 'Password must be at least 6 characters'],
			select: false
		},
		location: {
			address: {
				type: String,
				required: [true, 'Please add a valid address.']
			},
			city: {
				type: String,
				required: [true, 'Please add a valid city.']
			},
			state: {
				type: String,
				required: [true, 'Please add a valid state.']
			},
			country: {
				type: String,
				required: [true, 'Please add a valid country.']
			}
		},
		role: {
			type: String,
			enum: ['customer', 'admin'],
			default: 'customer'
		},
		resetPasswordToken: String,
		resetPasswordTokenExpiration: Date,
		triesToAccess: {
			type: Number,
			default: 10,
			min: 0,
			max: 10
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		toObject: {
			virtuals: true
		}
	}
);

// Encrypt password on save
UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.getAuthorizationToken = function() {
	return jwt.sign(
		{
			id: this._id
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRATION
		}
	);
};

UserSchema.methods.verifyPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.createRecoveryToken = async function() {
	const resetToken = await crypto.randomBytes(16).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha512')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordTokenExpiration = new Date(Date.now() + 15 * 60 * 1000);

	this.save({
		validateBeforeSave: false
	});

	return resetToken;
};

UserSchema.virtual('orders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'user',
	justOne: false,
	options: {
		sort: '-created_at',
		select: 'created_at'
	}
});

module.exports = mongoose.model('User', UserSchema);

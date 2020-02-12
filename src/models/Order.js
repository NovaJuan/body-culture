const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		maxlength: 9999999,
		minLength: 0,
		unique: true
	},
	items: {
		type: Array,
		required: [true, 'Please enter items in order']
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Please enter a user ID in order']
	},
	orderStatus: {
		type: String,
		enum: ['Completed', 'Cancelled', 'On Process'],
		default: 'On Process'
	},
	totalPay: {
		type: Number,
		required: true
	},
	shipping: {
		type: Number,
		required: true
	},
	totalWithShipping: Number,
	pay_method: {
		type: String,
		enum: ['stripe', 'paypal']
	},
	pay_id: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	address: {
		type: Object,
		required: true
	},
	refund: Number
});

OrderSchema.pre('save', function() {
	this.totalWithShipping = this.totalPay + this.shipping;
	if (this.isModified('refund')) {
		this.totalWithShipping -= this.refund;
	}
});

module.exports = mongoose.model('Order', OrderSchema);

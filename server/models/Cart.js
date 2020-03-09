const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('lodash');

const Product = require('./Product');

// Schema for items
const ItemSchema = new mongoose.Schema({
	productID: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please add a product id']
	},
	variations: {
		type: Object
	},
	quantity: {
		type: Number,
		required: [true, 'Please set the quantity'],
		min: 0
	}
});

const CartSchema = new mongoose.Schema({
	clientID: String,
	items: {
		type: [ItemSchema],
		default: []
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

CartSchema.pre('save', async function(next) {
	this.clientID = await crypto.randomBytes(16).toString('hex');
	if (this.user !== undefined) {
		this.expireAt = undefined;
	}
});

CartSchema.methods.addToCart = async function(newItem) {
	let itemAlreadyExists = false;

	this.items.map((item, i) => {
		if (item.productID.toString() === newItem.productID) {
			if (
				(item.variations &&
					newItem.variations &&
					_.isEqual(item.variations, newItem.variations)) ||
				(!item.variations && !newItem.variations)
			) {
				this.items[i].quantity += newItem.quantity;
				itemAlreadyExists = true;
			}
		}
	});

	if (itemAlreadyExists) {
		return (await this.save()).clientID;
	}

	this.items.push({
		productID: newItem.productID,
		variations: newItem.variations,
		quantity: newItem.quantity
	});

	await this.validate();

	return (await this.save()).clientID;
};

CartSchema.methods.addOne = async function(itemId) {
	this.items.map((item, i) => {
		if (item._id.toString() === itemId) {
			this.items[i].quantity++;
			this.productCount++;
		}
	});
	return (await this.save()).clientID;
};

CartSchema.methods.reduceOne = async function(itemId) {
	this.items.map((item, i) => {
		if (item._id.toString() === itemId) {
			if (this.items[i].quantity <= 1) {
				this.items.id(itemId).remove();
			} else {
				this.items[i].quantity--;
			}
			this.productCount--;
		}
	});
	return (await this.save()).clientID;
};

CartSchema.methods.removeItem = async function(itemId) {
	this.items.map((item, i) => {
		if (item._id.toString() === itemId) {
			const itemQty = this.items[i].quantity;
			this.items.id(itemId).remove();
			this.productCount -= itemQty;
		}
	});
	return (await this.save()).clientID;
};

CartSchema.methods.getCart = async function() {
	const itemsIds = this.items.map(item => item.productID);

	const products = await Product.find({
		_id: {
			$in: itemsIds
		}
	}).select('name price discountPrice discountPercent photo_id');

	const cart = {
		items: [],
		productCount: 0,
		totalPrice: 0,
		shipping: 0,
		totalWithShipping: 0
	};

	cart.items = this.items.map(item => {
		let cartItem;
		products.forEach(product => {
			if (product._id.toString() === item.productID.toString()) {
				cartItem = {
					itemID: item._id,
					product,
					quantity: item.quantity,
					individualPrice: product.discountPrice
						? product.discountPrice
						: product.price,
					totalItemPrice: product.discountPrice
						? product.discountPrice * item.quantity
						: product.price * item.quantity
				};

				if (item.variations) {
					cartItem.variations = item.variations;
				}

				cart.totalPrice += cartItem.totalItemPrice;
				cart.productCount += cartItem.quantity;
			}
		});
		if (cartItem) {
			return cartItem;
		}
	});

	cart.shipping = parseInt(
		(process.env.SHIPPING_PERCENT / 100) * cart.totalPrice
	);

	cart.totalWithShipping = parseInt(cart.totalPrice + cart.shipping);

	return cart;
};

module.exports = mongoose.model('Cart', CartSchema);

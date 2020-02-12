const mongoose = require('mongoose');
const shortId = require('shortid');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: `${process.env.CLOUDINARY_PUBLIC}`,
	api_secret: process.env.CLOUDINARY_SECRET
});

const ProductSchema = new mongoose.Schema({
	id: { type: String, unique: true, default: shortId.generate },
	name: {
		type: String,
		required: [true, 'Please enter a product name'],
		maxlength: 100,
		unique: [true, 'That name already exists.']
	},
	description: {
		type: String,
		required: [true, 'Please enter a product description']
	},
	price: {
		type: Number,
		required: [true, 'Please enter a product price'],
		min: 0
	},
	discountPrice: {
		type: Number,
		min: 0
	},
	discountPercent: {
		type: Number,
		min: 0
	},
	averageRating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5
	},
	// category:{
	//   type:mongoose.Schema.ObjectId,
	//   ref:'Category',
	//   required:[true,'Please select a category']
	// },
	category: {
		type: String,
		enum: {
			values: [
				'Shorts',
				'Shirts, Tops, Blouses and T-Shirts',
				'Pants and Trousers',
				'Jackets and Coats',
				'Skirts and Dresses',
				'Underwear',
				'Shoes',
				'Others'
			],
			message: 'Your category value is not valid'
		},
		required: [true, 'Please enter a category']
	},
	sex: {
		type: String,
		enum: {
			values: ['Male', 'Female', 'Both'],
			message: 'Your sex value is not valid'
		},
		required: [true, 'Please enter product sex']
	},
	section: {
		type: String,
		enum: {
			values: ['Formal', 'Casual', 'Sport', 'Everything'],
			message: 'Your section value is not valid'
		},
		required: [true, 'Please enter a section']
	},
	variations: Object,
	photo: {
		type: String,
		default: 'no-photo.jpg'
	},
	thumbnail: {
		type: String,
		default: 'no-photo.jpg'
	},
	card: {
		type: String,
		default: 'no-photo.jpg'
	},
	photo_id: {
		type: String,
		default: 'no-photo.jpg'
	},
	// gallery: {
	//   type: [String]
	// },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

//Index to search in all fields
ProductSchema.index({
	name: 'text',
	category: 'text',
	section: 'text',
	sex: 'text'
});

// Setting discount Percent using discount price on create
ProductSchema.pre('save', function(next) {
	if (this.isModified('discountPercent') || this.isModified('price')) {
		if (this.discountPercent <= 0) {
			this.discountPrice = undefined;
			this.discountPercent = undefined;
		} else {
			this.discountPrice = parseInt(
				this.price - (this.discountPercent / 100) * this.price
			);
		}
	}
	next();
});

// Deleting image when delete product
ProductSchema.pre('remove', async function(next) {
	if (this.photo !== 'no-photo.jpg') {
		await cloudinary.uploader.destroy(this.photo_id);
	}
	next();
});

// Using statics to make discount to one or more products
ProductSchema.statics.setManyDiscounts = async function(IDs, discount) {
	const products = await this.model('Product').find({
		_id: {
			$in: IDs
		}
	});

	products.map(async product => {
		product.discountPercent = discount;
		await product.save();
	});
};

// Using statics to delete discount to one or more products
ProductSchema.statics.deleteManyDiscounts = async function(IDs = []) {
	let query = {
		discountPercent: {
			$gt: 0
		}
	};
	if (IDs.length > 0) {
		query = {
			...query,
			_id: {
				$in: IDs
			}
		};
	}
	console.log(query);
	const products = await this.model('Product').find(query);

	products.map(async product => {
		product.discountPercent = 0;
		await product.save();
	});
};

module.exports = mongoose.model('Product', ProductSchema);

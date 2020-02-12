const path = require('path');
const uuid = require('uuid/v4');
const fs = require('fs-extra');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: `${process.env.CLOUDINARY_PUBLIC}`,
	api_secret: process.env.CLOUDINARY_SECRET
});

const filesHandler = async (req, res, product) => {
	// if (product.photo !== 'no-photo.jpg') {
	//   try {
	//     await fs.unlink(path.join(__dirname, `../public/uploads/main/${product.photo}`));
	//   } catch (err) {
	//     console.log(err);
	//   }
	// }

	if (req.files.photo) {
		if (req.files.photo.length) {
			const { tempFilePath } = req.files.photo[0];

			const { public_id } = await cloudinary.uploader.upload(tempFilePath);

			product.photo_id = public_id;
			product.thumbnail =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_50,c_pad,b_white,h_50,f_auto/' +
				public_id;
			product.card =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_300,c_pad,b_white,h_400,f_auto/' +
				public_id;
			product.photo =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_1000,c_pad,b_white,h_1000,f_auto/' +
				public_id;
		} else {
			const { tempFilePath } = req.files.photo;

			const { public_id } = await cloudinary.uploader.upload(tempFilePath);

			product.photo_id = public_id;
			product.thumbnail =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_50,c_pad,b_white,h_50,f_auto/' +
				public_id;
			product.card =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_300,c_pad,b_white,h_400,f_auto/' +
				public_id;
			product.photo =
				'https://res.cloudinary.com/dnchnxwkl/image/upload/w_1000,c_pad,b_white,h_1000,f_auto/' +
				public_id;
		}
	}

	product = await product.save();

	res.status(201).json({
		success: true,
		data: product
	});
};

module.exports = filesHandler;

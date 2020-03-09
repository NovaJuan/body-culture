const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: `${process.env.CLOUDINARY_PUBLIC}`,
	api_secret: process.env.CLOUDINARY_SECRET
});

const filesHandler = async (req, res, product) => {
	if (req.files.photo) {
		if (product.photo_id !== 'no-photo.jpg') {
			await cloudinary.uploader.destroy(product.photo_id);
		}

		if (req.files.photo.length) {
			const { tempFilePath } = req.files.photo[0];

			const { public_id } = await cloudinary.uploader.upload(tempFilePath);

			product.photo_id = public_id;
		} else {
			const { tempFilePath } = req.files.photo;

			const { public_id } = await cloudinary.uploader.upload(tempFilePath);

			product.photo_id = public_id;
		}
	}

	product = await product.save();

	res.status(201).json({
		success: true,
		data: product
	});
};

module.exports = filesHandler;

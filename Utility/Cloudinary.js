require("dotenv").config();
const cloudinary = require("cloudinary").v2;

//Initialize cloudinary connection
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Allow file types
const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
const allowedFileTypes = {
	image: allowedImageTypes,
};
// Upload image to cloudinary
const uploadToCloudinary = (file, folder) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file, { folder: folder, resource_type: "auto" }, (err, url) => {
			if (err) return reject(err);
			return resolve(url);
		});
	});
};

//Delete image from cloudinary
const deleteFromCloudinary = (url) => {
	cloudinary.uploader.destroy(url, (err, result) => {
		if (err) return console.log(err);
		return console.log(result);
	});
};
module.exports = { uploadToCloudinary, deleteFromCloudinary, getFileFromCloudinary, allowedFileTypes };

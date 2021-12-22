const { uploadToCloudinary, deleteFromCloudinary, getFileFromCloudinary, allowedFileTypes } = require("../Utility/cloudinary");
fileUploadController = {
	uploadFile: async (req, res) => {
		try {
			if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json("Your file is missing. Please input your file.");
			const file = req.files.file;
			console.log("🚀 ~ file: fileupload.js ~ line 17 ~ router.post ~ file", file);

			// Wrong file type
			const check_file_type = allowedFileTypes.image.includes(file["mimetype"]) || allowedFileTypes.audio.includes(file["mimetype"]) || allowedFileTypes.video.includes(file["mimetype"]) || allowedFileTypes.document.includes(file["mimetype"]);
			!check_file_type && res.status(400).json({ msg: "Invalid file format. The file link has been removed" });
			console.log(file["mimetype"].split("/")[0]);
			const cloudinary_file_upload = await uploadToCloudinary(file["tempFilePath"], file["mimetype"].split("/")[0]);
			!cloudinary_file_upload && res.status(400).json({ msg: "Error uploading file to cloudinary" });
			res.json({ public_id: cloudinary_file_upload.public_id, url: cloudinary_file_upload.secure_url });
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	deleteFile: async (req, res) => {
		try {
			const { public_id } = req.body;
			!public_id && res.status(400).json({ msg: "No image selected" });
			const delete_file = deleteFromCloudinary(public_id);
			res.json({ msg: `File of ID No. ${public_id} has been deleted. More info at ${delete_file}` });
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};
module.exports = fileUploadController;

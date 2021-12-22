const router = require("express").Router();
const fileUploadController = require("../Controllers/fileUploadController");
const auth = require("../Middleware/authentication");

//Upload file to cloudinary
router.post("/uploadFile", auth, fileUploadController.uploadFile);

//Delete file from cloudinary
router.post("/deleteFile", auth, fileUploadController.deleteFile);

//Get file based on public id
router.get("/getFile", auth, fileUploadController.getFile);

module.exports = router;

require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_LINK, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const mongo_db = mongoose.connection;
mongo_db.on("error", console.error.bind(console, "connection failure: "));
mongo_db.once("open", function () {
	console.log("database connection established");
});

// app.use(express.static(path.join(__dirname, "front-end")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(function (req, res, next) {
	//Enabling CORS
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});
app.use(fileUpload({ useTempFiles: true }));
app.use("/weather", require("./Routes/userRouter"));
app.use("/location", require("./Routes/roomChatRouter"));
app.use("/file", require("./Routes/fileUploadRouter"));
// Step 1:
app.use(express.static(path.resolve(__dirname, "./rmit-teams-front/build")));
// Step 2:
app.get("*", function (request, response) {
	response.sendFile(path.resolve(__dirname, "./rmit-teams-front/build", "index.html"));
});

const PORT = process.env.DEFAULT_PORT || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

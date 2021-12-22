const mongoose = require("mongoose");
const WeatherSchema = new mongoose.Schema({
	temperature: { type: Number },
	weather_type: { type: String },
});
module.exports = mongoose.models["Weather"] || mongoose.model("Weather", WeatherSchema);

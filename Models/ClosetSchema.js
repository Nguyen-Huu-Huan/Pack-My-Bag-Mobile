const mongoose = require("mongoose");
const LocationSubSchema = new mongoose.Schema({
	latitude: { type: Number },
	longitude: { type: Number },
	name: { type: String },
	location_type: { type: String },
});
const WeatherSubSchema = new mongoose.Schema({
	temperature: { type: Number },
	weather_type: { type: String },
});
const ClosetSchema = new mongoose.Schema({
	name: { type: String, required: true },
	item_icon: { type: String },
	position_in_closet: { type: Number },
	item_location: [LocationSubSchema],
	item_weather: [WeatherSubSchema],
});
module.exports = mongoose.models["Closet"] || mongoose.model("Closet", ClosetSchema);

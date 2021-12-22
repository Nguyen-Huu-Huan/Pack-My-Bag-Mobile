const WeatherModel = require("../Models/WeatherModel");
const WeatherController = {
	getAllWeatherTypes: async (req, res) => {
		try {
			const weatherTypes = await WeatherModel.find();
			!weatherTypes && res.status(400).json({ msg: "No weather type found" });
			res.json(weatherTypes);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};
module.exports = WeatherController;

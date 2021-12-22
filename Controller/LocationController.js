const LocationModel = require("../Models/LocationSchema");
const LocationController = {
	addLocation: async (req, res) => {
		try {
			const { latitude, longitude, name, location_type } = req.body;
			!latitude && res.status(400).json({ msg: "No latitude input" });
			!longitude && res.status(400).json({ msg: "No longitude input" });
			!name && res.status(400).json({ msg: "No name input" });
			!location_type && res.status(400).json({ msg: "No location_type input" });
			const newLocation = new LocationModel({
				latitude,
				longitude,
				name,
				location_type,
			});
			const location = await newLocation.save();
			res.json(location);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	removeLocation: async (req, res) => {
		try {
			const { locationID } = req.params;
			!locationID && res.status(400).json({ msg: "No id input" });
			const location = await LocationModel.findByIdAndDelete(locationID);
			!location && res.status(400).json({ msg: "No location found" });
			res.json(location);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	editLocation: async (req, res) => {
		try {
			const { locationID } = req.params;
			!locationID && res.status(400).json({ msg: "No id input" });
			const { latitude, longitude, name, location_type } = req.body;
			!latitude && res.status(400).json({ msg: "No latitude input" });
			!longitude && res.status(400).json({ msg: "No longitude input" });
			!name && res.status(400).json({ msg: "No name input" });
			!location_type && res.status(400).json({ msg: "No location_type input" });
			const location = await LocationModel.findByIdAndUpdate(locationID, {
				latitude,
				longitude,
				name,
				location_type,
			});
			!location && res.status(400).json({ msg: "No location found" });
			res.json(location);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	getAllLocations: async (req, res) => {
		try {
			const locations = await LocationModel.find();
			!locations && res.status(400).json({ msg: "No location found" });
			res.json(locations);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};
module.exports = LocationController;

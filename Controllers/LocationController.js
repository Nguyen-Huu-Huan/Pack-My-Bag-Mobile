import { storage, database } from "../FirebaseSetup";

const LocationController = {
	getAllLocations: () => {
		return database
			.ref("locations")
			.once("value")
			.then(function (snapshot) {
				return snapshot.val();
			});
	},
	createLocation: (location_data) => {
		database
			.ref("locations")
			.once("value")
			.then(function (snapshot) {
				const index = snapshot.numChildren();
				return database.ref("locations").child(index).set(location_data);
			});
	},
	updateLocation: (location_index, new_location_data) => {
		database.ref("locations").child(location_index).update(new_location_data);
	},
	deleteLocation: (location_index) => {
		database.ref("locations").child(location_index).remove();
	},
};
export default LocationController;

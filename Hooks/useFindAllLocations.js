import { useState, useEffect } from "react";
import LocationController from "../Controllers/LocationController";
export default function useFindAllLocations() {
	const [isLoadingLocations, setLoadingLocations] = useState(true);
	const [locations, setLocations] = useState([]);
	useEffect(async () => {
		const location_data = await LocationController.getAllLocations();
		console.log("the data is: ", location_data);
		setLocations(location_data);
		setLoadingLocations(false);
	}, []);
	return {
		locations,
		isLoadingLocations,
	};
}

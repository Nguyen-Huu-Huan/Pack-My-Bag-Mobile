import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ClosetController from "./Controllers/ClosetController";
import LocationController from "./Controllers/LocationController";
import { useEffect, useState } from "react";
import useFindAllLocations from "./Hooks/useFindAllLocations";
import { LocationContext } from "./Contexts/LocationContext";
export default function App() {
	useEffect(() => {
		LocationController.getAllLocations().then((data) => {
			setLocationData(data);
			console.log(data);
		});
	}, []);
	const { locations, isLoadingLocations } = useFindAllLocations();
	return (
		<LocationContext.Provider value={{ locations, isLoadingLocations }}>
			<NavigationContainer>{!isLoadingLocations ? <AppNavigator /> : <></>}</NavigationContainer>
		</LocationContext.Provider>
	);
}

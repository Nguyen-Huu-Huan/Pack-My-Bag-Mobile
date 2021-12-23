import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ClosetController from "./Controllers/ClosetController";
import LocationController from "./Controllers/LocationController";
import { useEffect, useState } from "react";
export default function App() {
	const [locationData, setLocationData] = useState([]);
	useEffect(() => {
		LocationController.getAllLocations().then((data) => {
			setLocationData(data);
			console.log(data);
		});
	}, []);
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
}

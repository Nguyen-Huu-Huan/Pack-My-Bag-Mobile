import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Entypo from "react-native-vector-icons/Entypo";
const LocationMap = ({ location_list, go_to_location }) => {
	const [pin, setPin] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});
	const { width, height } = Dimensions.get("screen");
	const headToLocation = useRef(null);
	const [currentPosition, setCurrentPosition] = useState({});
	const [isHeadLocation, setHeadLocation] = useState(false);
	
	useEffect(() => {
		if (Object.keys(go_to_location).length !== 0){
			setHeadLocation(!isHeadLocation);
			headToLocation.current.animateToRegion(
				{
					latitude: go_to_location.latitude,
					longitude: go_to_location.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.05,
				  },
				350
			);
		}
	}, [go_to_location]);

	
	const getDirections = async (startLoc, desLoc) => {
		try {
			const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}`);
			const respJson = await resp.json();
		} catch (error) {
			console.log("Error: ", error);
		}
	};
	useEffect(async () => {
		_getLocationAsync = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			console.log("the permission status is: ", status);
			if (status === "granted") {
				let location = await Location.getCurrentPositionAsync({});
				var location_formated = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.05,
				};
				setCurrentPosition(location_formated);
				setRegion(location_formated);
			} else {
				const response = await Location.requestForegroundPermissionsAsync();
			}
		};
		_getLocationAsync();
	}, []);
	const [region, setRegion] = useState({});
	return (
		<View style={{ flex: 1 }}>
			<MapView ref={headToLocation} style={styles.map} initialRegion={currentPosition} loadingEnabled provider="google" followUserLocation showsUserLocation>
				{region.latitude && region.longitude ? (
					<Marker
						draggable={true}
						pinColor="blue"
						description="The region's location"
						coordinate={{
							latitude: region.latitude,
							longitude: region.longitude,
						}}
					/>
				) : null}
				{currentPosition.latitude && currentPosition.longitude ? (
					// You can add image property to change the marker's shape: E.x: image={require("../../assets/Images/favicon.png")}
					<Marker
						draggable={true}
						description="Your current location"
						coordinate={{
							latitude: currentPosition.latitude,
							longitude: currentPosition.longitude,
						}}
					>
						<Callout style={{ width: 200, backgroundColor: "#4C516D" }}>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<TouchableOpacity>
									<Entypo name="location-pin" size={30} color="red" />
								</TouchableOpacity>
								<Text style={{ color: "white" }}>You are here</Text>
							</View>
						</Callout>
					</Marker>
				) : null}

				<View>
					{location_list.map((location, index) => {
						return (
							<View key={index}>
								<Marker
									draggable={true}
									description={location.label}
									coordinate={{
										latitude: location.latitude,
										longitude: location.longitude,
									}}
									// onPress={() => renderLocationImage(location)}
								>
									
									<Callout tooltip style={{ width: "auto", backgroundColor: "#4C516D", borderRadius: 10 }}>
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "center",
												paddingLeft: 5,
												paddingRight: 5
											}}
										>
											<TouchableOpacity style={{paddingLeft: 5, paddingRight: 15}}>
												<Entypo name="location-pin" size={30} color="red" />
											</TouchableOpacity>
											<Text style={{ color: "white", paddingRight: 20 }}>{location.label}</Text>
										</View>
									</Callout>
								</Marker>
							</View>
						);
					})}
				</View>
				{currentPosition.latitude && currentPosition.longitude ? <Circle center={currentPosition} radius={500} /> : null}
			</MapView>
		</View>
	);
};

export default LocationMap;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

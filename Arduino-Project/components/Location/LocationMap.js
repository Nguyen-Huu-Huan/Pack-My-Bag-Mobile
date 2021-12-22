import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Entypo from "react-native-vector-icons/Entypo";
const LocationMap = ({ location_list }) => {
	const [pin, setPin] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});

	const { width, height } = Dimensions.get("screen");
	const headToLocation = useRef(null);
	const [currentPosition, setCurrentPosition] = useState({});
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
	const renderLocationImage = (item) => {
		console.log("the item is: ", item);
		return (
			<Image
				style={{
					flex: 1,
					width: width * 0.95,
					alignSelf: "center",
					height: height * 0.15,
					position: "absolute",
					bottom: height * 0.05,
					zIndex: 90,
				}}
				source={{ uri: item.placeIcon }}
			/>
		);
	};
	return (
		<View style={{ flex: 1 }}>
			{/* <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        minLength={3}
        listViewDisplayed={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          headToLocation.current.animateToRegion(
            {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.05,
            },
            350
          );
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
            placeIcon: details.icon,
          });
          renderLocationImage({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
            placeIcon: details.icon,
          });
        }}
        onFail={(error) => console.error(error)}
        query={{
          key: "AIzaSyCG4AL8db0VHirXhLZbh_ORFJXCNuxikfg",
          language: "en",
          // types: "(cities)",
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      /> */}
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
									onPress={() => renderLocationImage(location)}
								>
									<Callout tooltip style={{ width: 200, backgroundColor: "#4C516D" }}>
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
											<Text style={{ color: "white" }}>{location.label}</Text>
										</View>
									</Callout>
								</Marker>
							</View>
						);
						renderLocationImage(location);
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

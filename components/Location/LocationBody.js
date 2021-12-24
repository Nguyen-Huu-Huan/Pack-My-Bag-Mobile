import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import LocationController from "../../Controllers/LocationController";
import LocationItemList from "./LocationItemList";
import LocationMap from "./LocationMap";
const LocationBody = ({ navigation }) => {
	const [locationList, setLocationList] = useState([]);
	useEffect(async () => {
		const location_data = await LocationController.getAllLocations();
		console.log("the data is: ", location_data);
		setLocationList(location_data);
	}, []);
	// const location_list = [
	// 	{
	// 		label: "Tan Hung General Hospital",
	// 		place: "Hospital",
	// 		latitude: 10.7511639,
	// 		longitude: 106.6962811,
	// 		placeIcon: "https://thuocdantoc.vn/wp-content/uploads/2019/01/benh-vien-da-khoa-tan-hung-508x385.jpg",
	// 	},
	// 	{
	// 		label: "RMIT Vietnam",
	// 		place: "School",
	// 		latitude: 10.7295037,
	// 		longitude: 106.6960337,
	// 		placeIcon: "https://slsc.vn/wp-content/uploads/2020/12/1.jpg",
	// 	},
	// 	{
	// 		label: "McDonald's",
	// 		place: "Restaurant",
	// 		latitude: 10.7295629,
	// 		longitude: 106.7036329,
	// 		placeIcon: "https://image.sggp.org.vn/600x315/Uploaded/2020/evofjasfzyr/2017_12_08/tgmcdonalds_mmpq.jpg",
	// 	},
	// 	{
	// 		label: "Ben Thanh Market",
	// 		place: "Market",
	// 		latitude: 10.7721095,
	// 		longitude: 106.6982784,
	// 		placeIcon: "http://cdn.thinglink.me/api/image/840280059011923970/1024/10/scaletowidth/0/0/1/1/false/true?wait=true",
	// 	},
	// 	{
	// 		label: "Bui Vien Walking Street",
	// 		place: "Park",
	// 		latitude: 10.7652592,
	// 		longitude: 106.6902981,
	// 		placeIcon: "http://sodulich.hochiminhcity.gov.vn/UPLOADS/TinTuc/CKUploadIMG/2018/6/201806190344224044.jpg",
	// 	},
	// ];
	// const [currentPlace, setCurrentPlace]
	// const selectLocation = useCallback({
	// 	label: "Tan Hung General Hospital",
	// 	value: "0",
	// 	place: "Hospital",
	// 	latitude: "10.7511639",
	// 	longitude: "106.6962811",
	// });

	// })
	const place_type = ["Market", "School", "WorkPlace", "Hospital", "Park", "Restaurant", "Library"];
	return (
		<View>
			<LocationItemList navigation={navigation} location_list={locationList} place_type={place_type} />
			{/* <LocationCreate navigation={navigation} location_list={locationList} /> */}
			<LocationMap navigation={navigation} location_list={locationList} place_type={place_type} />
		</View>
	);
};

export default LocationBody;

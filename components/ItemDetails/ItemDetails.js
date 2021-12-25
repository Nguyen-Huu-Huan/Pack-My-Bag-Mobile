import React, { useState, useContext } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LocationContext } from "../../Contexts/LocationContext";
import * as ImagePicker from "expo-image-picker";
import Popover from "react-native-popover-view";
import { ActivityIndicator } from "react-native-elements";
import ClosetController from "../../Controllers/ClosetController";
const ItemDetails = ({ route, navigation }) => {
	const { locations } = useContext(LocationContext);
	const [positionIndex, setPositionIndex] = useState(null);
	const [weatherIndex, setWeatherIndex] = useState(null);
	const [value, setValue] = useState(null);
	const [name, setName] = useState(null);
	const [itemIcon, setItemIcon] = useState("");
	const [positionList, setPositionList] = useState([]);
	const [showPopover, setShowPopover] = useState(false);
	const [isError, setIsError] = useState(false);
	const [weatherList, setWeatherList] = useState([]);
	const [isLoadingSubmitData, setIsLoadingSubmitData] = useState(false);
	const { item_data } = route.params;

	if (item_data.length > 0 && name === null) {
		item_data.map((item) => {
			setPositionIndex(item.closet_position_index);
			setPositionList(item.item_location);
			setName(item.name);
			console.log("This is item name", item.name);

			setWeatherList(item.weather_type);
		});
	}
	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>position - {item}</Text>
				{item === positionIndex && <AntDesign style={styles.icon} color="red" name={item.icon ? item.icon : "checkcircle"} size={20} />}
			</View>
		);
	};
	const renderPosition = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>
					{item.label} - {item.location_type}
				</Text>
				{item.value === value && <AntDesign style={styles.icon} color="red" name={item.icon ? item.icon : "checkcircle"} size={20} />}
			</View>
		);
	};
	const renderWeather = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item}</Text>
				{item === weatherIndex && <AntDesign style={styles.icon} color="red" name={item.icon ? item.icon : "checkcircle"} size={20} />}
			</View>
		);
	};
	// const data = [
	// 	{
	// 		label: "Tan Hung General Hospital",
	// 		value: "0",
	// 		place: "Hospital",
	// 		latitude: 10.7511639,
	// 		longitude: 106.6962811,
	// 		placeIcon: "https://thuocdantoc.vn/wp-content/uploads/2019/01/benh-vien-da-khoa-tan-hung-508x385.jpg",
	// 	},
	// 	{
	// 		label: "RMIT Vietnam",
	// 		value: "1",
	// 		place: "School",
	// 		latitude: 10.7295037,
	// 		longitude: 106.6960337,
	// 		placeIcon: "https://slsc.vn/wp-content/uploads/2020/12/1.jpg",
	// 	},
	// 	{
	// 		label: "McDonald's",
	// 		value: "2",
	// 		place: "Restaurant",
	// 		latitude: 10.7295629,
	// 		longitude: 106.7036329,
	// 		placeIcon: "https://image.sggp.org.vn/600x315/Uploaded/2020/evofjasfzyr/2017_12_08/tgmcdonalds_mmpq.jpg",
	// 	},
	// 	{
	// 		label: "Ben Thanh Market",
	// 		value: "3",
	// 		place: "Market",
	// 		latitude: 10.7721095,
	// 		longitude: 106.6982784,
	// 		placeIcon: "http://cdn.thinglink.me/api/image/840280059011923970/1024/10/scaletowidth/0/0/1/1/false/true?wait=true",
	// 	},
	// 	{
	// 		label: "Bui Vien Walking Street",
	// 		value: "4",
	// 		place: "Park",
	// 		latitude: 10.7652592,
	// 		longitude: 106.6902981,
	// 		placeIcon: "http://sodulich.hochiminhcity.gov.vn/UPLOADS/TinTuc/CKUploadIMG/2018/6/201806190344224044.jpg",
	// 	},
	// ];
	const handleChoosePhoto = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("...");
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {
				setItemIcon(result.uri);
			}
		}
	};
	const handleChangePositionOption = () => {
		if (value) {
			if (positionList.indexOf(value) === -1) {
				setPositionList([...positionList, value]);
			}
		}
	};
	const handleDeletePositionOption = (positionName) => {
		var newData = [...positionList];
		var index = newData.indexOf(positionName);
		newData.splice(index, 1);
		setPositionList(newData);
	};
	const handleChangeWeatherOption = () => {
		if (weatherIndex) {
			if (weatherList.indexOf(weatherIndex) === -1) {
				setWeatherList([...weatherList, weatherIndex]);
			}
		}
	};
	const handleDeleteWeatherOption = (weatherName) => {
		var newData = [...weatherList];
		var index = newData.indexOf(weatherName);
		newData.splice(index, 1);
		setWeatherList(newData);
	};
	const handleSubmitItem = async () => {
		setIsLoadingSubmitData(true);
		console.log("Name of the item :", name);
		console.log("closet_position_index :", positionIndex);
		console.log("item_location :", positionList);
		console.log("icon: ", itemIcon);
		console.log("weather_type :", weatherList);

		if (name) {
			var itemIconBlob = "";
			if (itemIcon) {
				const fetchItemIcon = await fetch(itemIcon);
				itemIconBlob = await fetchItemIcon.blob();
			}
			var newItem = {
				name: name,
				closet_position_index: positionIndex || "",
				item_location: positionList || [""],
				icon: itemIconBlob || "",
				weather_type: weatherList || [""],
			};

			var icon_uploaded = await ClosetController.createItem(newItem);
			if (icon_uploaded) {
				setIsError(false);
			}
		} else {
			setIsError(true);
		}
		setIsLoadingSubmitData(false);
		setShowPopover(true);
	};
	return (
		<ScrollView style={styles.scrollView}>
			{/* {isLoadingSubmitData ? (
				<View style={{ flex: 1 }}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<></>
			)} */}

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Item Details</Text>
				</View>

				<View style={styles.itemDetails}>
					<View style={styles.itemDetailsHeader}>
						<Text style={styles.itemDetailsHeaderText}>Item Info</Text>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Item Name</Text>
							<TextInput style={styles.itemDetailsHeaderTextInput} defaultValue={name} placeholder="Search" onChangeText={(text) => setName(text)} />
							<Text style={styles.itemDetailsBodyRowText}>{item_data.name}</Text>
						</View>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Item Icon</Text>
							<TouchableOpacity onPress={handleChoosePhoto}>
								<Icon name="image" type="font-awesome" color="black" />
							</TouchableOpacity>
							{itemIcon ? (
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Image source={{ uri: itemIcon }} style={{ width: 200, height: 200 }} />
								</View>
							) : null}
						</View>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Position in closet</Text>
							<Dropdown
								style={styles.dropdown}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								iconStyle={styles.iconStyle}
								data={[1, 2, 3, 4, 5, 6, 7, 8]}
								maxHeight={300}
								placeholder={positionIndex ? "Closet position " + positionIndex : "Choose the item's position in the closet"}
								onChange={(item) => {
									setPositionIndex(item);
								}}
								value={positionIndex}
								renderLeftIcon={() => <Foundation style={(styles.icon, { marginEnd: 10 })} color="black" name="list-number" size={20} />}
								renderItem={renderItem}
							/>
						</View>
					</View>
					<View style={styles.itemDetailsHeader}>
						<Text style={styles.itemDetailsHeaderText}>Location</Text>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Position</Text>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<Dropdown
									style={styles.dropdown}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									inputSearchStyle={styles.inputSearchStyle}
									iconStyle={styles.iconStyle}
									data={locations}
									search
									maxHeight={300}
									placeholder={value ? value : "Choose your locations"}
									searchPlaceholder="Location searching..."
									value={value}
									onChange={(item) => {
										setValue(item.label);
									}}
									renderLeftIcon={() => <Entypo style={(styles.icon, { marginEnd: 10 })} color="black" name="location" size={20} />}
									renderItem={renderPosition}
								/>
								<TouchableOpacity
									onPress={handleChangePositionOption}
									style={{
										width: 40,
										height: 40,
										marginTop: 20,
										backgroundColor: "#222160",
										borderRadius: 50,
									}}
								>
									<Text>
										<MaterialIcons color="white" name="add-location" size={40} />
									</Text>
								</TouchableOpacity>
							</View>
							<View style={{ display: "flex", flexDirection: "column" }}>
								{positionList
									? positionList.map((position) => {
											return (
												<View
													style={{
														display: "flex",
														backgroundColor: "#222160",
														flexDirection: "row",
														alignContent: "center",
														justifyContent: "space-between",
														margin: 6,
														padding: 10,
														borderRadius: 15,
													}}
													key={position}
												>
													<Text
														style={{
															marginTop: 5,
															marginStart: 5,
															color: "white",
															fontSize: 18,
															fontWeight: "bold",
														}}
													>
														{position}
													</Text>
													<TouchableOpacity
														onPress={() => handleDeletePositionOption(position)}
														style={{
															width: 40,
															height: 40,
															backgroundColor: "#222160",
															borderRadius: 50,
														}}
													>
														<Text>
															<FontAwesome color="white" name="remove" size={40} />
														</Text>
													</TouchableOpacity>
												</View>
											);
									  })
									: null}
							</View>
						</View>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Weather</Text>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<Dropdown
									style={styles.dropdown}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									iconStyle={styles.iconStyle}
									data={["Cloud/Sunny", "Clear Sky", "Rainy", "Drizzle", "Ashy/Dusty", "Windy", "Tornado", "Misty/Foggy", "Thunderstorm", "Snow"]}
									maxHeight={300}
									placeholder={weatherIndex ? "Apllied on " + weatherIndex + "Days" : "Choose the weather day you want to use the item"}
									value={weatherIndex}
									onChange={(item) => {
										setWeatherIndex(item);
									}}
									renderLeftIcon={() => <Entypo style={(styles.icon, { marginEnd: 10 })} color="black" name="location" size={20} />}
									renderItem={renderWeather}
								/>
								<TouchableOpacity
									onPress={handleChangeWeatherOption}
									style={{
										width: 40,
										height: 40,
										marginTop: 20,
										backgroundColor: "#222160",
										borderRadius: 50,
									}}
								>
									<Text>
										<MaterialIcons color="white" name="add-location" size={40} />
									</Text>
								</TouchableOpacity>
							</View>
							<View style={{ display: "flex", flexDirection: "column" }}>
								{weatherList
									? weatherList.map((weather) => {
											return (
												<View
													style={{
														display: "flex",
														backgroundColor: "#222160",
														flexDirection: "row",
														alignContent: "center",
														justifyContent: "space-between",
														margin: 6,
														padding: 10,
														borderRadius: 15,
													}}
													key={weather}
												>
													<Text
														style={{
															marginTop: 5,
															marginStart: 5,
															color: "white",
															fontSize: 18,
															fontWeight: "bold",
														}}
													>
														{weather}
													</Text>
													<TouchableOpacity
														onPress={() => handleDeleteWeatherOption(weather)}
														style={{
															width: 40,
															height: 40,
															backgroundColor: "#222160",
															borderRadius: 50,
														}}
													>
														<Text>
															<FontAwesome color="white" name="remove" size={40} />
														</Text>
													</TouchableOpacity>
												</View>
											);
									  })
									: null}
							</View>
						</View>
					</View>
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							onPress={handleSubmitItem}
							style={{
								width: 40,
								height: 40,

								color: "#222160",
							}}
						>
							<Text>
								<Entypo size={40} name="add-to-list" color="white" />
							</Text>
						</TouchableOpacity>
						<Popover isVisible={showPopover} onRequestClose={() => setShowPopover(false)}>
							<View
								style={{
									position: "relative",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									paddingHorizontal: 100,
									paddingVertical: 30,
								}}
							>
								{isError ? <MaterialIcons color="#ffae42" name="error" size={80} /> : <AntDesign name="checkcircle" size={80} color="#90EE90" />}

								<Text
									style={{
										fontSize: 30,
										marginVertical: 10,
										fontFamily: "font1",
									}}
								>
									{isError ? "Error!" : "Confirm!"}
								</Text>
								<Text style={{ fontSize: 16, color: "#989898" }}>{isError ? "Name is required" : "Your customize item has been added/updated"}</Text>
								<TouchableOpacity
									style={{
										marginTop: 30,
										borderRadius: 5,
										backgroundColor: "#ace5ee",
										width: 100,
										height: 50,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={() => {
										setShowPopover(false);
										navigation.push("YourCloset", { reFetchData: true });
									}}
								>
									<Text>OK</Text>
								</TouchableOpacity>
							</View>
						</Popover>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
export default ItemDetails;
const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
		flexGrow: 1,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textItem: {
		flex: 1,
		fontSize: 16,
	},

	container: {
		backgroundColor: "#4C516D",
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#3D4C6F",
	},
	headerText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	scrollView: {},
	itemDetails: {
		padding: 20,
	},
	itemDetailsHeader: {},
	itemDetailsHeaderText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	itemDetailsBody: {
		marginTop: 20,
	},
	itemDetailsBodyRow: {
		marginBottom: 10,
	},
	itemDetailsBodyRowText: {
		color: "#fff",
		fontSize: 16,
	},
	itemDetailsHeaderTextInput: {
		backgroundColor: "#fff",
		color: "black",
		borderRadius: 7,
		paddingHorizontal: 10,
	},
});

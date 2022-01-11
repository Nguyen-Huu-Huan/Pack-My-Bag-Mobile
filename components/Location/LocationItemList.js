import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LocationItemList = ({ location_list, place_type, navigation, head_to_location }) => {
	const [value, setValue] = useState(null);
	const [data, setData] = useState(location_list);
	// console.log("the data is", data);
	
	const renderItem = (item) => {
		return (	
			<View style={styles.item}>
				<Text style={styles.textItem}>
					{item.label} - {item.location_type}
				</Text>
				{item.label === value && <AntDesign style={styles.icon} color="red" name={"checkcircle"} size={20} />}
			</View>		
			
		);
	};

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				marginEnd: 15,
			}}
		>
			<Dropdown
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				search
				labelField="label"
          		valueField="location_type"
				data={data}
				maxHeight={300}
				placeholder={value ? value : "Choose your location"}
				searchPlaceholder="Location searching..."
				value={value}
				onChange={(item) => {
					setValue(item.label);
					head_to_location({"latitude": parseFloat(item.latitude), "longitude": parseFloat(item.longitude)})
				}}
				renderLeftIcon={() => <Entypo style={styles.icon} color="black" name="location" size={20} />}
				renderItem={renderItem}
			/>
			
			<TouchableOpacity onPress={() => navigation.navigate("LocationCreate")}>
				<Text>
					<MaterialIcons style={styles.icon} color="black" name="add-location-alt" size={40} />
				</Text>
			</TouchableOpacity>
			
		</View>
	);
};

export default LocationItemList;

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
	icon: {
		marginRight: 5,
		color: "#FF2400",
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
});

import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

// import { HomeStyles } from "./Home-stylesheet.js";
const HomeBody = ({ navigation }) => {
	return (
		<View>
			<Text style={styles.Title}>Information Hub</Text>
			<ScrollView horizontal style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
				<TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate("YourCloset")}>
					{/* <Icon name="g-translate" color="#00aced" size={35} style={styles.Icon} /> */}
					<MaterialCommunityIcon name="toolbox" size={30} color="#00aced" style={styles.Icon} />
					<Text style={{ color: "white", textAlign: "center" }}>Your closet</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate("Location")}>
					{/* <Icon name="location-pin" color="#00aced" size={35} style={styles.Icon} /> */}
					<FontAwesomeIcon name="location-arrow" size={30} color="#00aced" style={styles.Icon} />
					<Text style={{ color: "white", textAlign: "center" }}>Destination</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate("Weather")}>
					{/* <Icon name="weather-fog" color="#00aced" size={35} style={styles.Icon} /> */}
					<MaterialCommunityIcon name="weather-fog" size={30} color="#00aced" style={styles.Icon} />
					<Text style={{ color: "white", textAlign: "center" }}>Weather</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchableOpacity}>
					{/* <Icon name="g-translate" color="#00aced" size={35} style={styles.Icon} /> */}
					<Text style={{ color: "white", textAlign: "center" }}>Weather</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* <Text style={HomeStyles.header}>Hello world</Text> */}
		</View>
	);
};
export default HomeBody;
const styles = StyleSheet.create({
	Title: {
		marginLeft: 20,
		fontWeight: "bold",
		fontSize: 24,
	},
	touchableOpacity: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#4C516D",
		borderRadius: 10,
		width: 200,
		height: 150,
		marginLeft: 20,
		marginRight: 20,
	},
	Icon: {
		marginBottom: 20,
	},
});

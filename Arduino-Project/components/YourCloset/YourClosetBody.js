import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import YourClosetItemList from "./YourClosetItemList";
const YourClosetBody = ({ navigation, item_data_list }) => {
	return (
		<View>
			<YourClosetItemList navigation={navigation} item_data_list={item_data_list} />
		</View>
	);
};
export default YourClosetBody;

import React from "react";
import { View, Text, TouchableOpacity, Avatar, ScrollView, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from "react-native-elements";
const YourClosetBody = ({ navigation, item_data, remove_item }) => {
	var image_source = "../../assets/Images/" + item_data.icon;
	return (
		<View style={{ marginBottom: 10, background: "blue" }}>
			<ListItem.Swipeable
				bottomDivider
				rightContent={
					<Button
						title="Remove"
						icon={{ name: "delete", color: "white" }}
						buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
						onPress={() => {
							remove_item(item_data.id);
						}}
					/>
				}
			>
				<Image style={styles.image} source={require("../../assets/Images/favicon.png")} />
				<ListItem.Content>
					<ListItem.Title>{item_data.name}</ListItem.Title>
				</ListItem.Content>
			</ListItem.Swipeable>
		</View>
	);
};
export default YourClosetBody;
const styles = StyleSheet.create({
	image: {
		width: 50,
		height: 50,
	},
});

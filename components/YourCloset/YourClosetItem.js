import React from "react";
import { View, Text, TouchableOpacity, Avatar, ScrollView, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from "react-native-elements";
const YourClosetItem = ({ navigation, item_data, item_index, remove_item }) => {
	var image_source = item_data.icon;
	return (
		<View style={{ marginBottom: 10, background: "blue" }}>
			<ListItem.Swipeable
				bottomDivider
				leftContent={
					<Button title="Details" icon={{ name: "info", color: "white" }} buttonStyle={{ minHeight: "100%", backgroundColor: "#2832C2" }} onPress={() => navigation.navigate("ItemInfo", { item_data: [item_data], view_info: true })} />
				}
				rightContent={
					<Button
						title="Remove"
						icon={{ name: "delete", color: "white" }}
						buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
						onPress={() => {
							remove_item(item_index);
						}}
					/>
				}
			>
				<View style={styles.imageWrapper}>
					<Image style={styles.image} source={{ uri: image_source }} />
				</View>
				
				<ListItem.Content>
					<ListItem.Title>{item_data.name}</ListItem.Title>
				</ListItem.Content>
			</ListItem.Swipeable>
		</View>
	);
};
export default YourClosetItem;
const styles = StyleSheet.create({
	imageWrapper: {
		width: 50,
		height: 50,
		borderRadius: 10,
		borderWidth: 1, 
		borderStyle: "solid",
		borderColor: "#222160",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	image: {
		width: 48,
		height: 48,
		borderRadius: 10,
		
	},
});

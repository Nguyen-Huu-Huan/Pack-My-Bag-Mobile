import React from "react";
import { SafeAreaView } from "react-native";
import YourClosetHeader from "../components/YourCloset/YourClosetHeader";
import YourClosetBody from "../components/YourCloset/YourClosetBody";
export default function YourCloset({ navigation }) {
	const item_data_list = [
		{
			id: 1,
			name: "Umbrella",
			icon: "icon.png",
		},
		{
			id: 2,
			name: "Sunglasses",
			icon: "icon.png",
		},
		{
			id: 3,
			name: "Hat",
			icon: "icon.png",
		},
		{
			id: 4,
			name: "Shirt",
			icon: "umbrella.jfif",
		},
	];
	return (
		<SafeAreaView>
			<YourClosetHeader item_data_list={item_data_list} />
			<YourClosetBody navigation={navigation} item_data_list={item_data_list} />
		</SafeAreaView>
	);
}

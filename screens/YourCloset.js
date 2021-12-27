import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import YourClosetHeader from "../components/YourCloset/YourClosetHeader";
import { ScrollView } from "react-native-gesture-handler";
import YourClosetBody from "../components/YourCloset/YourClosetBody";
import ClosetController from "../Controllers/ClosetController";
export default function YourCloset({ navigation, route }) {
	const [closetData, setClosetData] = useState([]);
	const [isDataLoading, setDataLoading] = useState(false);
	const reLoadData = route.params ? route.params.reFetchData : false;
	useEffect(async () => {
		setDataLoading(true);
		const refresh = navigation.addListener("focus", () => {
			Promise.resolve(ClosetController.getAllItems()).then((data) => {
				if (data) {
					setClosetData(data);
				}
				setDataLoading(false);
			});
		});
		return refresh;
	}, [reLoadData, navigation]);
	const item_data_list = [
		{
			id: 1,
			name: "Umbrella",
			icon: "icon.png",
			slot: 8,
		},
		{
			id: 2,
			name: "Sunglasses",
			icon: "icon.png",
			slot: 3,
		},
		{
			id: 3,
			name: "Hat",
			icon: "icon.png",
			slot: null,
		},
		{
			id: 4,
			name: "Shirt",
			icon: "umbrella.jfif",
			slot: 2,
		},
		{
			id: 5,
			name: "Phone",
			icon: "umbrella.jfif",
			slot: null,
		},
		{
			id: 6,
			name: "Car Key",
			icon: "umbrella.jfif",
			slot: 5,
		},
	];
	if (!isDataLoading) {
		return (
			<SafeAreaView>
				<ScrollView>
					<YourClosetHeader item_data_list={closetData} />
					<YourClosetBody navigation={navigation} item_data_list={closetData} />
				</ScrollView>
			</SafeAreaView>
		);
	} else {
		return <SafeAreaView></SafeAreaView>;
	}
}

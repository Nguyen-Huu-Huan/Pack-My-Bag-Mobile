import React from "react";
import { SafeAreaView } from "react-native";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function ItemInfo({ route, navigation }) {
	return (
		<SafeAreaView>
			<ItemDetails navigation={navigation} route={route} />
		</SafeAreaView>
	);
}

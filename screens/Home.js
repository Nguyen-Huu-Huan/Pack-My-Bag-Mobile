import React from "react";
import { SafeAreaView } from "react-native";
import HomeBody from "../components/Home/HomeBody";
import HomeHeader from "../components/Home/HomeHeader";

export default function Home({ navigation }) {
	return (
		<SafeAreaView>
			<HomeHeader />
			<HomeBody navigation={navigation} />
		</SafeAreaView>
	);
}

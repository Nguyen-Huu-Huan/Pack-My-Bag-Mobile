import React from "react";
import { SafeAreaView } from "react-native";
import LocationHeader from "../components/Location/LocationHeader";
import LocationBody from "../components/Location/LocationBody";
import firebase from "../FirebaseSetup";

export default function Location({ navigation }) {
	useEffect(() => {
		const db = firebase.database();
		db.ref("/locations").on("value", (snapshot) => {
			const locations = snapshot.val();
			console.log(locations);
		});
	}, []);

	return (
		<SafeAreaView>
			<LocationHeader />
			<LocationBody navigation={navigation} />
		</SafeAreaView>
	);
}

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { Header, BottomSheet, ListItem, Button, Badge } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import ClosetController from "../../Controllers/ClosetController";

const YourClosetHeader = ({ item_data_list }) => {
	const isFocused = useIsFocused();
	const [isVisible, setIsVisible] = useState(false);
	const [itemDataList, setItemDataList] = useState(null)
	const confirmConnection = () => {
		setIsVisible(false);
	};
	var dataItem = itemDataList;
	if (!dataItem) {
		dataItem = item_data_list
	}
	useEffect(async () => {
		Promise.resolve(ClosetController.getAllItems()).then((data) => {
			if (data) {
				setItemDataList(data)
			}
		});
	}, [isFocused, isVisible]);
	//filter all items that does not have a slot in the closet
	 dataItem = dataItem.filter((item) => item.closet_position_index !== null);
	 dataItem = dataItem.sort((firstitem, seconditem) => {
		return firstitem.closet_position_index - seconditem.closet_position_index;
	});
	const data_filtered = [];
	for (let i = 1; i < 9; i++) {
		var error = 0;
		dataItem.map((item) => {
			if (item.closet_position_index === i) {
				data_filtered.push(item);
				error += 1;
			}
		});
		if (error === 0) {
			data_filtered.push(null);
		}
	}
	return (
		<Header
			containerStyle={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}
			leftComponent={
				<SafeAreaProvider style={{width: 200}}>
					<Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Your Closet</Text>
				</SafeAreaProvider>
			}
			
			rightComponent={
				<SafeAreaProvider style={{}}>
					<Button
						title="View Summary"
						titleStyle={{ color: "white"}}
						containerStyle={{ borderRadius: 20, flexDirection: "row" }}
						buttonStyle={{
							backgroundColor: "#222160",
							borderRadius: 20,
							width: 155,
							height: 45,
						}}
						icon={{
							name: "arrow-right",
							type: "font-awesome",
							size: 15,
							color: "white",
						}}
						iconRight
						onPress={() => setIsVisible(true)}
					/>
					<BottomSheet modalProps={{}} isVisible={isVisible} containerStyle={{backgroundColor: "white", flexDirection: "column", justifyContent: "center" }}>
						{data_filtered &&
							data_filtered.map((item, index) => {
								return (
									<View key={index} >
										<View style={{flexDirection: "row", justifyContent: "space-between"}}>
											<Text style={{ marginStart: 20, fontSize: 18, fontWeight: "bold" }}>Slot {`${index + 1}`}</Text>
											{item?<Badge value="Occupied" badgeStyle={{height: 30, marginRight: 10, backgroundColor: "#222160"}} textStyle={{paddingLeft: 10, paddingRight: 10, fontWeight: "bold", fontSize: 16}}/>: null}
										</View>
										<ListItem>
											<View style={styles.imageWrapper}>
												<Image style={styles.image} source={{ uri: item ? item.icon : "" }}  />
											</View>
											<ListItem.Content>
												<ListItem.Title style={{ color: "black" }}>{item ? item.name : "This item has not been set up yet"}</ListItem.Title>
											</ListItem.Content>
										</ListItem>
									</View>
								);
							})}
						<Button title="Confirm" buttonStyle={{ backgroundColor: "green" }} onPress={() => confirmConnection()} />
					</BottomSheet>
				</SafeAreaProvider>
			}
		/>
	);
};
export default YourClosetHeader;
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

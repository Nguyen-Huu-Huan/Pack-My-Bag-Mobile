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
  return (
    <SafeAreaView>
      <YourClosetHeader item_data_list={item_data_list} />
      <YourClosetBody navigation={navigation} item_data_list={item_data_list} />
    </SafeAreaView>
  );
}

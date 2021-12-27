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

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LocationHeader from "../components/Location/LocationHeader";
import LocationBody from "../components/Location/LocationBody";
import LocationController from "../Controllers/LocationController";
import firebase from "../FirebaseSetup";
import { useIsFocused } from "@react-navigation/native";

export default function Location({ navigation, route }) {
  const [locationDataList, setLocationDataList] = useState([]);
  const isFocused = useIsFocused();
  const [isDataLoading, setDataLoading] = useState(false);
  const reloadData = route.params ? route.params.reFetchData : false;
  useEffect(async () => {
    setDataLoading(true);
    const refresh = navigation.addListener("focus", () => {
      Promise.resolve(LocationController.getAllLocations()).then((data) => {
        if (data) {
          setLocationDataList(data);
        }
        setDataLoading(false);
      });
    });
    return refresh;
  }, [reloadData, navigation, isFocused]);
  if (!isDataLoading) {
    return (
      <SafeAreaView>
        <LocationHeader />
        <LocationBody
          navigation={navigation}
          route={route}
          location_data_list={locationDataList}
        />
      </SafeAreaView>
    );
  } else {
    return <SafeAreaView></SafeAreaView>;
  }
}

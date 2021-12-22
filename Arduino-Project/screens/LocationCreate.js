import React from "react";
import { SafeAreaView } from "react-native";
import LocationCreate from "../components/Location/LocationCreate";

export default function Location({ navigation }) {
  return (
    <SafeAreaView>
      <LocationCreate navigation={navigation} />
    </SafeAreaView>
  );
}

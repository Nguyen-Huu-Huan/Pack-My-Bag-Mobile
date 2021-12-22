import React from "react";
import { SafeAreaView } from "react-native";
import LocationHeader from "../components/Location/LocationHeader";
import LocationBody from "../components/Location/LocationBody";

export default function Location({ navigation }) {
  return (
    <SafeAreaView>
      <LocationHeader />
      <LocationBody navigation={navigation} />
    </SafeAreaView>
  );
}

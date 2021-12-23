import React from "react";
import { SafeAreaView } from "react-native";
import WeatherMain from "../components/Weather/WeatherMain";
export default function Weather({ navigation }) {
  return (
    <SafeAreaView>
      {/* <HomeHeader />
			<HomeBody /> */}
      <WeatherMain navigation={navigation} />
    </SafeAreaView>
  );
}

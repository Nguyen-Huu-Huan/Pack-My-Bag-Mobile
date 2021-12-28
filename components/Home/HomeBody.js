import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { LocationContext } from "../../Contexts/LocationContext";
import { ClosetContext } from "../../Contexts/ClosetContext";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AwesomeButton from "react-native-really-awesome-button";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import ClosetController from "../../Controllers/ClosetController";
import LocationController from "../../Controllers/LocationController";
import { useIsFocused } from "@react-navigation/native";

// import { HomeStyles } from "./Home-stylesheet.js";
const HomeBody = ({ navigation }) => {
  const [choice, setChoice] = useState(null);
  // var { locations } = useContext(LocationContext);
  var { closetItems } = useContext(ClosetContext);
  const openWeatherKey = `651f17426e3a852e30a3107b8f1dd555`;
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  const [currentWeather, setCurrentWeather] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [closetData, setClosetData] = useState([]);
  const [locations, setLocations] = useState([]);
  const isFocused = useIsFocused();
  const loadCurrentWeather = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const response = await fetch(
      `${url}appid=${openWeatherKey}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`);
    } else {
      setCurrentWeather(data);
    }

    setRefreshing(false);
  };
  useEffect(() => {
    if (!currentWeather) {
      loadCurrentWeather();
    }
  }, []);
  useEffect(async () => {
    Promise.resolve(ClosetController.getAllItems()).then((data) => {
      if (data) {
        setClosetData(data);
      }
    });
  }, [choice, isFocused]);
  useEffect(async () => {
    Promise.resolve(LocationController.getAllLocations()).then((data) => {
      if (data) {
        setLocations(data);
      }
    });
  }, [isFocused]);
  // console.log("This is closetItems Length", closetItems.length);
  // console.log("This is closetData Length", closetData.length);
  if (closetItems !== closetData) {
    closetItems = [...closetData];
  }
  const connectToArduino = async () => {
    itemDataResult = [];
    setIsSearchLoading(true);
    console.log("This is when u click button", closetItems.length);
    await closetItems.forEach(async (item) => {
      try {
        if (item.item_location.includes(choice)) {
          var weather_type = currentWeather.weather;
          var match_weather_type = [];
          await weather_type.forEach((type) => {
            switch (type.main) {
              case "Rain":
                match_weather_type.push("Rainy");
                break;
              case "Snow":
                match_weather_type.push("Snowy");
                break;
              case "Drizzle":
                match_weather_type.push("Drizzle");
                break;
              case "Thunderstorm":
                match_weather_type.push("Thunderstorm");
                break;
              case "Mist":
                match_weather_type.push("Misty/Foggy");
                break;
              case "Fog":
                match_weather_type.push("Misty/Foggy");
                break;
              case "Ash":
                match_weather_type.push("Ashy/Dusty");
                break;
              case "Dust":
                match_weather_type.push("Ashy/Dusty");
                break;
              case "Smoke":
                match_weather_type.push("Ashy/Dusty");
                break;
              case "Sand":
                match_weather_type.push("Ashy/Dusty");
                break;
              case "Haze":
                match_weather_type.push("Ashy/Dusty");
                break;
              case "Squall":
                match_weather_type.push("Windy");
                break;
              case "Tornado":
                match_weather_type.push("Tornado");
                break;
              case "Clear":
                match_weather_type.push("Clear Sky");
                break;
              case "Clouds":
                match_weather_type.push("Cloudy/Sunny");
                break;
              default:
                break;
            }
          });
          match_weather_type.forEach((type) => {
            try {
              if (item.weather_type.includes(type)) {
                itemDataResult.push(item);
              }
            } catch (err) {
              console.log("weather_type field is missing: ", err);
            }
          });
        }
      } catch (err) {
        console.log("item_location field is missing: ", err);
      }
    });
    console.log("the searching result is: ", itemDataResult);
    setIsSearchLoading(false);
    return itemDataResult;
  };
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.label === choice && (
          <AntDesign
            color="red"
            name={item.icon ? item.icon : "checkcircle"}
            size={20}
          />
        )}
      </View>
    );
  };
  return (
    <View style={{ position: "relative" }}>
      <Text style={styles.Title}>Information Hub</Text>
      <ScrollView
        horizontal
        style={{ width: "100%" }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate("YourCloset")}
        >
          {/* <Icon name="g-translate" color="#00aced" size={35} style={styles.Icon} /> */}
          <MaterialCommunityIcon
            name="toolbox"
            size={30}
            color="#00aced"
            style={styles.Icon}
          />
          <Text style={{ color: "white", textAlign: "center" }}>
            Your closet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate("Location")}
        >
          {/* <Icon name="location-pin" color="#00aced" size={35} style={styles.Icon} /> */}
          <FontAwesomeIcon
            name="location-arrow"
            size={30}
            color="#00aced"
            style={styles.Icon}
          />
          <Text style={{ color: "white", textAlign: "center" }}>
            Destination
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate("Weather")}
        >
          {/* <Icon name="weather-fog" color="#00aced" size={35} style={styles.Icon} /> */}
          <MaterialCommunityIcon
            name="weather-fog"
            size={30}
            color="#00aced"
            style={styles.Icon}
          />
          <Text style={{ color: "white", textAlign: "center" }}>Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          {/* <Icon name="g-translate" color="#00aced" size={35} style={styles.Icon} /> */}
          <Text style={{ color: "white", textAlign: "center" }}>Weather</Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignContent: "center",

          //   backgroundColor: "red",
          top: 350,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            left: 200,
            color: "#E0115F",
          }}
        >
          <FontAwesome5
            style={{ marginHorizontal: 10 }}
            color="black"
            name="hand-point-right"
            size={20}
          />
          Where you want to go
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={locations}
          maxHeight={300}
          placeholder={
            choice ? "Place : " + choice : "Choose the avaiable place"
          }
          onChange={(item) => {
            setChoice(item.label);
          }}
          value={choice}
          renderLeftIcon={() => (
            <FontAwesome5
              style={{ marginEnd: 10 }}
              color="black"
              name="place-of-worship"
              size={20}
            />
          )}
          renderItem={renderItem}
        />
        <AwesomeButton
          style={{ left: 250 }}
          progress={isSearchLoading}
          backgroundColor="#FF8300"
          width={150}
          onPress={connectToArduino}
        >
          <MaterialCommunityIcon
            name="access-point"
            size={30}
            color="#00aced"
            style={(styles.Icon, { marginEnd: 10 })}
          />
          <Text style={{ color: "white", fontSize: 18 }}>Connect</Text>
        </AwesomeButton>
      </View>

      {/* <Text style={HomeStyles.header}>Hello world</Text> */}
    </View>
  );
};
export default HomeBody;
const styles = StyleSheet.create({
  Title: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 24,
  },
  touchableOpacity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C516D",
    borderRadius: 10,
    width: 200,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
  },
  Icon: {
    marginBottom: 20,
  },
  dropdown: {
    margin: 16,
    maxHeight: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    flexGrow: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});

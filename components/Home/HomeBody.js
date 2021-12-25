import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import { LocationContext } from "../../Contexts/LocationContext";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AwesomeButton from "react-native-really-awesome-button";

import { Dropdown } from "react-native-element-dropdown";

// import { HomeStyles } from "./Home-stylesheet.js";
const HomeBody = ({ navigation }) => {
  const [choice, setChoice] = useState(null);
  const { locations } = useContext(LocationContext);

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
          progress
          backgroundColor="#FF8300"
          width={150}
          onPress={(next) => {
            console.log("User want to go to: ", choice);
            next();
          }}
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

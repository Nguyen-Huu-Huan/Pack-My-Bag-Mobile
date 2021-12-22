import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
const ItemDetails = ({ route, navigation }) => {
  const [positionIndex, setPositionIndex] = useState(null);
  const [weatherIndex, setWeatherIndex] = useState(null);
  const [value, setValue] = useState(null);
  const [itemIcon, setItemIcon] = useState("");
  const { item_data } = route.params;
  console.log("the item icon is: ", itemIcon);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>position - {item}</Text>
        {item === positionIndex && (
          <AntDesign
            style={styles.icon}
            color="red"
            name={item.icon ? item.icon : "checkcircle"}
            size={20}
          />
        )}
      </View>
    );
  };
  const renderPosition = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>
          {item.label} - {item.place}
        </Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="red"
            name={item.icon ? item.icon : "checkcircle"}
            size={20}
          />
        )}
      </View>
    );
  };
  const renderWeather = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
        {item === weatherIndex && (
          <AntDesign
            style={styles.icon}
            color="red"
            name={item.icon ? item.icon : "checkcircle"}
            size={20}
          />
        )}
      </View>
    );
  };
  const data = [
    {
      label: "Tan Hung General Hospital",
      value: "0",
      place: "Hospital",
      latitude: 10.7511639,
      longitude: 106.6962811,
      placeIcon:
        "https://thuocdantoc.vn/wp-content/uploads/2019/01/benh-vien-da-khoa-tan-hung-508x385.jpg",
    },
    {
      label: "RMIT Vietnam",
      value: "1",
      place: "School",
      latitude: 10.7295037,
      longitude: 106.6960337,
      placeIcon: "https://slsc.vn/wp-content/uploads/2020/12/1.jpg",
    },
    {
      label: "McDonald's",
      value: "2",
      place: "Restaurant",
      latitude: 10.7295629,
      longitude: 106.7036329,
      placeIcon:
        "https://image.sggp.org.vn/600x315/Uploaded/2020/evofjasfzyr/2017_12_08/tgmcdonalds_mmpq.jpg",
    },
    {
      label: "Ben Thanh Market",
      value: "3",
      place: "Market",
      latitude: 10.7721095,
      longitude: 106.6982784,
      placeIcon:
        "http://cdn.thinglink.me/api/image/840280059011923970/1024/10/scaletowidth/0/0/1/1/false/true?wait=true",
    },
    {
      label: "Bui Vien Walking Street",
      value: "4",
      place: "Park",
      latitude: 10.7652592,
      longitude: 106.6902981,
      placeIcon:
        "http://sodulich.hochiminhcity.gov.vn/UPLOADS/TinTuc/CKUploadIMG/2018/6/201806190344224044.jpg",
    },
  ];
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("...");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setItemIcon(result.uri);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Item Details</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.itemDetails}>
          <View style={styles.itemDetailsHeader}>
            <Text style={styles.itemDetailsHeaderText}>Item Info</Text>
          </View>
          <View style={styles.itemDetailsBody}>
            <View style={styles.itemDetailsBodyRow}>
              <Text style={styles.itemDetailsBodyRowText}>Item Name</Text>
              <TextInput
                style={styles.itemDetailsHeaderTextInput}
                placeholder="Search"
              />
              <Text style={styles.itemDetailsBodyRowText}>
                {item_data.name}
              </Text>
            </View>
            <View style={styles.itemDetailsBodyRow}>
              <Text style={styles.itemDetailsBodyRowText}>Item Icon</Text>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Icon name="image" type="font-awesome" color="black" />
              </TouchableOpacity>
              {itemIcon ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: itemIcon }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.itemDetailsBodyRow}>
              <Text style={styles.itemDetailsBodyRowText}>
                Position in closet
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                maxHeight={300}
                placeholder={
                  positionIndex
                    ? "Closet position " + positionIndex
                    : "Choose the item's position in the closet"
                }
                onChange={(item) => {
                  setPositionIndex(item);
                }}
                value={positionIndex}
                renderLeftIcon={() => (
                  <Foundation
                    style={(styles.icon, { marginEnd: 10 })}
                    color="black"
                    name="list-number"
                    size={20}
                  />
                )}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.itemDetailsHeader}>
            <Text style={styles.itemDetailsHeaderText}>Location</Text>
          </View>
          <View style={styles.itemDetailsBody}>
            <View style={styles.itemDetailsBodyRow}>
              <Text style={styles.itemDetailsBodyRowText}>Position</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choose your location"
                searchPlaceholder="Location searching..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <Entypo
                    style={(styles.icon, { marginEnd: 10 })}
                    color="black"
                    name="location"
                    size={20}
                  />
                )}
                renderItem={renderPosition}
              />
            </View>
          </View>
          <View style={styles.itemDetailsBody}>
            <View style={styles.itemDetailsBodyRow}>
              <Text style={styles.itemDetailsBodyRowText}>Weather</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={["Sunny", "Cloudy", "Rainy", "Smoggy", "Windy"]}
                maxHeight={300}
                placeholder={
                  weatherIndex
                    ? "Apllied on " + weatherIndex + "Days"
                    : "Choose the weather day you want to use the item"
                }
                value={weatherIndex}
                onChange={(item) => {
                  setWeatherIndex(item);
                }}
                renderLeftIcon={() => (
                  <Entypo
                    style={(styles.icon, { marginEnd: 10 })}
                    color="black"
                    name="location"
                    size={20}
                  />
                )}
                renderItem={renderWeather}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ItemDetails;
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
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

  container: {
    backgroundColor: "#4C516D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#3D4C6F",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {},
  itemDetails: {
    padding: 20,
  },
  itemDetailsHeader: {},
  itemDetailsHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDetailsBody: {
    marginTop: 20,
  },
  itemDetailsBodyRow: {
    marginBottom: 10,
  },
  itemDetailsBodyRowText: {
    color: "#fff",
    fontSize: 16,
  },
  itemDetailsHeaderTextInput: {
    backgroundColor: "#fff",
    color: "black",
    borderRadius: 7,
    paddingHorizontal: 10,
  },
});

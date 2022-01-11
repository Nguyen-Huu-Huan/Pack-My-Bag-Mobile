import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Avatar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from "react-native-elements";
import { useState, useCallback, useEffect } from "react";
import YourClosetItem from "./YourClosetItem";
import { SearchBar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import ClosetController from "../../Controllers/ClosetController";
import { ActivityIndicator } from "react-native";
const YourClosetBody = ({ navigation, item_data_list }) => {
  const [itemSearchInput, setItemSearchInput] = useState("");
  const [itemDataList, setItemDataList] = useState(item_data_list);
  const [isLoadingRemoveData, setLoadingRemoveData] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [allAvailablePositions, setAllAvailablePositions] = useState([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  if (navigation.state) {
    const { newItem } = navigation.state.params.newItem;
  }
  useEffect(() => {
    if (currentData !== item_data_list) {
      setCurrentData(item_data_list);
    }
  }, [item_data_list]);
  useEffect(() => {
    if (currentData !== itemDataList) {
      setCurrentData(itemDataList);
    }
  }, [itemDataList]);
  const removeItem = useCallback(async (item_id) => {
    setLoadingRemoveData(true);
    Promise.resolve(ClosetController.removeItem(item_id)).then(() => {
      setLoadingRemoveData(false);
      setItemDataList(
        currentData.filter((item, index, rep) => index !== item_id)
      );
      console.log("this is item length after filter", itemDataList.length);
    });
  });
  const updateSearch = (searchInput) => {
    setItemSearchInput(searchInput);
  };
  useEffect(() => {
    if (item_data_list) {
      item_data_list.forEach((item) => {
        if (allAvailablePositions.includes(item.closet_position_index)) {
          setAllAvailablePositions(
            allAvailablePositions.filter(
              (position) => position !== item.closet_position_index
            )
          );
        }
      });
    }
  }, [item_data_list, allAvailablePositions]);
  useEffect(() => {
    if (item_data_list) {
      if (itemSearchInput !== "") {
        const filteredList = item_data_list.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(itemSearchInput.toLowerCase());
        });
        setItemDataList(filteredList);
      } else {
        setItemDataList(item_data_list);
      }
    }
  }, [itemSearchInput]);

  // console.log("This is item_data_list", item_data_list.length);
  // console.log("This is itemDataList", itemDataList.length);
  console.log(currentData.length);
  return (
    <View style={styles.wrapper}>
      {isLoadingRemoveData ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <></>
      )}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "90%", backgroundColor: "#f5f5f5", marginBottom: 10, borderRadius: 30,  }}>
          <SearchBar
            style={{height: "100%"}}
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={itemSearchInput}
            lightTheme
            containerStyle={{backgroundColor: "#f5f5f5", borderRadius: 30}}
            inputContainerStyle={{borderRadius: 30, backgroundColor: "#DCDCDC"}}
            leftIconContainerStyle={{marginLeft: 20}}
          />
        </View>
        <View
          style={{
            width: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemInfo", {
                item_data: [],
                available_closet_index: allAvailablePositions,
              })
            }
          >
            <Text>
              <Ionicons
                style={styles.icon}
                color="#222160"
                name="add-circle-sharp"
                size={40}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {currentData.length > 0 && (
        <ScrollView>
          {currentData.map((item_data, index) => {
            return (
              <YourClosetItem
                key={index}
                navigation={navigation}
                item_index={index}
                item_data={item_data}
                remove_item={removeItem}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
export default YourClosetBody;
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  listItem: {
    borderRadius: 20,
    backgroundColor: "#4C516D",
  },
});

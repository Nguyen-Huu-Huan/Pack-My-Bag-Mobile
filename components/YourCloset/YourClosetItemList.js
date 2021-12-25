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
const YourClosetBody = ({ navigation, item_data_list }) => {
  const [itemSearchInput, setItemSearchInput] = useState("");
  const [itemDataList, setItemDataList] = useState(item_data_list);
  const removeItem = useCallback((item_id) => {
    console.log("the remove item id is: ", item_id);
    setItemDataList((prevState) => {
      return prevState.filter((item, index) => index !== item_id);
    });
  }, []);
  const updateSearch = (searchInput) => {
    setItemSearchInput(searchInput);
  };

  useEffect(() => {
    if (itemSearchInput !== "") {
      const filteredList = item_data_list.filter((item) => {
        return item.name.toLowerCase().includes(itemSearchInput.toLowerCase());
      });
      setItemDataList(filteredList);
    } else {
      setItemDataList(item_data_list);
    }
  }, [itemSearchInput]);

  return (
    <View style={styles.wrapper}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "90%", backgroundColor: "white" }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={itemSearchInput}
            lightTheme
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
            onPress={() => navigation.push("ItemInfo", { item_data: [] })}
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
      {itemDataList.map((item_data, index) => {
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

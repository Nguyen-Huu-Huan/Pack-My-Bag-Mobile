import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Header, BottomSheet, ListItem, Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

const YourClosetHeader = ({ item_data_list }) => {
  const [isVisible, setIsVisible] = useState(false);
  const confirmConnection = () => {
    setIsVisible(false);
  };
  //filter all items that does not have a slot in the closet
  item_data_list = item_data_list.filter(
    (item) => item.closet_position_index !== null
  );
  item_data_list = item_data_list.sort((firstitem, seconditem) => {
    return firstitem.closet_position_index - seconditem.closet_position_index;
  });
  const data_filtered = [];
  for (let i = 1; i < 9; i++) {
    var error = 0;
    item_data_list.map((item) => {
      if (item.closet_position_index === i) {
        data_filtered.push(item);
        error += 1;
      }
    });
    if (error === 0) {
      data_filtered.push(null);
    }
  }
  console.log(data_filtered.length);
  return (
    <Header
      centerComponent={{
        text: "Your closet",
        style: {
          color: "#fff",
          fontSize: 28,
        },
      }}
      rightComponent={
        <SafeAreaProvider>
          <Button
            title="View Summary"
            titleStyle={{ color: "white", marginRight: 15 }}
            containerStyle={{ borderRadius: 20 }}
            buttonStyle={{
              backgroundColor: "#222160",
              borderRadius: 20,
              width: 170,
              height: 50,
            }}
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            onPress={() => setIsVisible(true)}
          />
          <BottomSheet
            modalProps={{}}
            isVisible={isVisible}
            containerStyle={{ backgroundColor: "white" }}
          >
            {/* {item_data_list.map((item_data) => (
              <ListItem
                key={item_data.id}
                containerStyle={{ backgroundColor: "white " }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/Images/favicon.png")}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ color: "black" }}>
                    {item_data.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))} */}

            {data_filtered.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={{ marginStart: 20, fontSize: 18 }}>
                    This is slot {`${index + 1}`}
                  </Text>
                  <ListItem containerStyle={{ backgroundColor: "white " }}>
                    <Image
                      style={styles.image}
                      source={require("../../assets/Images/favicon.png")}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{ color: "black" }}>
                        {item ? item.name : "This item has not been set up yet"}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </View>
              );
            })}
            <Button
              title="Confirm"
              buttonStyle={{ backgroundColor: "green" }}
              onPress={() => confirmConnection()}
            />
          </BottomSheet>
        </SafeAreaProvider>
      }
    />
  );
};
export default YourClosetHeader;
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});

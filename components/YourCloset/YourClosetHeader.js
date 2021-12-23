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
  console.log("the data list contains: ", item_data_list);
  const [isVisible, setIsVisible] = useState(false);
  const confirmConnection = () => {
    setIsVisible(false);
  };
  return (
    <Header
      centerComponent={{
        text: "Your closet",
        style: { color: "#fff", fontSize: 28 },
      }}
      rightComponent={
        <SafeAreaProvider>
          <Button
            title="Connect"
            titleStyle={{ color: "white", marginRight: 15 }}
            containerStyle={{ borderRadius: 20 }}
            buttonStyle={{
              backgroundColor: "#222160",
              borderRadius: 20,
              width: 150,
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
            {item_data_list.map((item_data, item_index) => (
              <ListItem
                key={item_index}
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
            ))}
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

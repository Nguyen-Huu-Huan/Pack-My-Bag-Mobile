import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LocationItemList = ({ location_list, place_type, navigation }) => {
  const [value, setValue] = useState(null);
  //   const [showPopover, setShowPopover] = useState(false);
  const [data, setData] = useState(location_list);
  //   const [submitData, setSubmitData] = useState({
  //     label: "",
  //     value: "",
  //     place: "",
  //   });
  //   const onSubmit = () => {
  //     setSubmitData({ ...submitData, value: data.length.toString() });
  //     console.log(submitData);
  //     setData([...data, submitData]);
  //     setSubmitData({
  //       label: "",
  //       value: "",
  //       place: "",
  //     });
  //     setShowPopover(false);
  //   };
  const renderItem = (item) => {
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

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginEnd: 15,
      }}
    >
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
          <Entypo style={styles.icon} color="black" name="location" size={20} />
        )}
        renderItem={renderItem}
      />
      {/* onPress={() => setShowPopover(true)} */}
      <TouchableOpacity onPress={() => navigation.navigate("LocationCreate")}>
        <Text>
          <MaterialIcons
            style={styles.icon}
            color="black"
            name="add-location-alt"
            size={40}
          />
        </Text>
      </TouchableOpacity>
      {/* <Popover
        isVisible={showPopover}
        onRequestClose={() => {
          setShowPopover(false);
          setSubmitData({
            label: "",
            value: "",
            place: "",
          });
        }}
      >
        <View
          style={{
            margin: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SelectDropdown
            data={place_type}
            onSelect={(selectedItem, index) => {
              //   let copyData = [...submitData];
              //   copyData[2] = selectedItem;
              //   setSubmitData(copyData);
              setSubmitData({ ...submitData, place: selectedItem });
              console.log(submitData);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <TextInput
            placeholder="Enter the name of choosing location"
            onChangeText={(text) => {
              setSubmitData({ ...submitData, label: text });
              console.log(submitData);
            }}
            style={{
              borderWidth: 2,
              borderColor: "#00aced",
              margin: 20,
              width: 200,
            }}
          />
          <Button title="submit" onPress={() => onSubmit()}></Button>
        </View>
      </Popover> */}
    </View>
  );
};

export default LocationItemList;

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
  icon: {
    marginRight: 5,
    color: "#FF2400",
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
});

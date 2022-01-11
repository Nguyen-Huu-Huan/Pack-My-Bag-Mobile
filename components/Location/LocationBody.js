import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LocationController from "../../Controllers/LocationController";
import LocationItemList from "./LocationItemList";
import LocationMap from "./LocationMap";
const LocationBody = ({ navigation, location_data_list }) => {
  const [locationList, setLocationList] = useState(location_data_list);
  const [loadingLocationData, setLoadingLocationData] = useState(false);
  const [goToLocation, setToLocation] = useState({});
  
  const headToLocation = useCallback((location) => {
    setToLocation(location);
  }, []);

  

  const place_type = [
    "Market",
    "School",
    "WorkPlace",
    "Hospital",
    "Park",
    "Restaurant",
    "Library",
  ];
  return (
    <View>
      <LocationItemList
        navigation={navigation}
        head_to_location={headToLocation}
        location_list={locationList}
        place_type={place_type}
      />
      {/* <LocationCreate navigation={navigation} location_list={locationList} /> */}
      <LocationMap
        navigation={navigation}
        go_to_location={goToLocation}
        location_list={locationList}
        place_type={place_type}
      />
    </View>
  );
};

export default LocationBody;

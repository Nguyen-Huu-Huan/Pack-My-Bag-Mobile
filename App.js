import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ClosetController from "./Controllers/ClosetController";
import LocationController from "./Controllers/LocationController";
import { useEffect, useState } from "react";
import useFindAllLocations from "./Hooks/useFindAllLocations";
import useFindAllClosetItems from "./Hooks/useFindAllClosetItems";
import { LocationContext } from "./Contexts/LocationContext";
import { ClosetContext } from "./Contexts/ClosetContext";
export default function App() {
  const { locations, isLoadingLocations } = useFindAllLocations();
  const { closetItems, isLoadingCloset } = useFindAllClosetItems();
  return (
    <ClosetContext.Provider value={{ closetItems, isLoadingCloset }}>
      <LocationContext.Provider value={{ locations, isLoadingLocations }}>
        <NavigationContainer>
          {!isLoadingLocations && !isLoadingCloset ? <AppNavigator /> : <></>}
        </NavigationContainer>
      </LocationContext.Provider>
    </ClosetContext.Provider>
  );
}

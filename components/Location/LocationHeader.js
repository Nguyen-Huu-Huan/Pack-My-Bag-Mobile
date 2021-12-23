import React from "react";
import { Header } from "react-native-elements";

const YourClosetHeader = () => {
  return (
    <Header
      centerComponent={{
        text: "Location options",
        style: { color: "#fff", fontWeight: "bold", fontSize: 18 },
      }}
    />
  );
};
export default YourClosetHeader;

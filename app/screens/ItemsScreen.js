import React from "react";
import { View } from "react-native";
import BibleCard from "../components/BibleCard";

function ItemsScreen(props) {
  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        flex: 1,
        padding: 20,
        paddingTop: 100,
      }}
    >
      <BibleCard
        title="John MacArthur Study Guide"
        subTitle="Study the book of Matthew in-depth with the help of John's handy guide."
        image={require("../assets/gtylogo.jpg")}
      />
    </View>
  );
}

export default ItemsScreen;

import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import BiblePickerItem from "../components/BiblePickerItem";

function ChaptersScreen({ navigation, route, onSelectItem, setModalVisible }) {
  const DATA = [];

  for (let i = 0; i < 150; i++) {
    DATA.push({
      id: i,
      backgroundColor: "#FFFB79",
      title: i + 1,
      short: i + 1,
    });
  }

  // const [value, onChangeText] = React.useState(route.params.title);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: value === "" ? "No title" : value,
  //   });
  // }, [navigation, value]);

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      numColumns={7}
      renderItem={({ item }) => (
        <BiblePickerItem
          item={item}
          label={item.label}
          onPress={() => {
            setModalVisible(false);
            onSelectItem(item);
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.light,
    flex: 1,
    marginHorizontal: 15,
  },
  sectionTitle: {
    // backgroundColor: "green",
    fontSize: 20,
  },
  titleCard: { alignItems: "flex-end", height: 55, justifyContent: "center" },
});

export default ChaptersScreen;

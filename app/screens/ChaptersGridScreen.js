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

function ChaptersGridScreen({
  chapters,
  navigation,
  route,
  onSelectItem,
  setModalVisible,
}) {
  const DATA = [];

  for (let i = 0; i < chapters; i++) {
    DATA.push({
      id: i,
      backgroundColor: "#FFFB79",
      title: i + 1,
      short: i + 1,
    });
  }

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      numColumns={7}
      renderItem={({ item }) => (
        <BiblePickerItem
          item={item}
          label={item.short}
          onPress={() => {
            // setModalVisible(false);
            // onSelectItem(item);
          }}
        />
      )}
      columnWrapperStyle={{
        aspectRatio: 1,
        justifyContent: "flex-start",
        width: "14.2857%",
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});

export default ChaptersGridScreen;

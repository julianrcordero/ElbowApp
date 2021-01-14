import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
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

function ChaptersScreen({ navigation, onSelectItem, setModalVisible }) {
  const DATA = [];

  for (let i = 0; i < 150; i++) {
    DATA.push({
      id: i,
      backgroundColor: "#FFFB79",
      title: i + 1,
      short: i + 1,
    });
  }

  return (
    <Screen style={styles.modal}>
      <Button
        title="Close"
        // style={{
        //   marginBottom: 10,
        // }}
        onPress={() => setModalVisible(false)}
      />
      <AppText>Old Testament</AppText>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={7}
        style={{
          paddingTop: 10,
          // marginHorizontal: 15
        }}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ChaptersScreen;

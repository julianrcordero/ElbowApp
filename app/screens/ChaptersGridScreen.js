import React, { useState, useEffect, PureComponent } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
  View,
  Pressable,
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
import { TouchableOpacity } from "react-native-gesture-handler";

class ChaptersGridScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { close, chapters, route } = this.props;

    const { gridChapters } = route ? route.params : 0;

    const chapterNum = gridChapters ?? chapters;
    const DATA = [];

    for (let i = 0; i < chapterNum; i++) {
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
          <TouchableOpacity onPress={close}>
            <BiblePickerItem item={item} label={item.short} flex={1 / 7} />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          width: "14.2857%",
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default ChaptersGridScreen;

import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import postsApi from "../api/posts";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import Square from "../components/Square";

export default function ToursScreen({ navigation }) {
  const getSubscribedToursApi = useApi(postsApi.getSubscribedTours);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = () => {
    getSubscribedToursApi.request();
  };

  return (
    <Screen style={styles.screen}>
      <TouchableOpacity style={{}} onPress={loadTours}>
        <AppText
          style={{
            color: colors.primary,
            fontSize: 40,
            fontWeight: "bold",
            marginVertical: 25,
            paddingHorizontal: 45,
          }}
        >
          {"My Tours"}
        </AppText>
      </TouchableOpacity>
      {/* {getSubscribedToursApi.error && (
        <>
          <AppText>Couldn't retrieve the posts.</AppText> */}
      {/* </>
      )} */}
      <ActivityIndicator visible={getSubscribedToursApi.loading} />
      {/* <Indicator animating={getSubscribedToursApi.loading} size={"large"} /> */}
      {!getSubscribedToursApi.loading && (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginHorizontal: 35,
          }}
        >
          <Square key={"unlock"} icon={"block-helper"} title={"UNLOCK"} />
          <Square
            key={"continue"}
            icon={"microsoft-internet-explorer"}
            title={"CONTINUE"}
          />
          {getSubscribedToursApi.data.tours?.map((item) => (
            <Square key={item.ID} title={item.title} />
          ))}
        </ScrollView>
      )}
      <View style={styles.footer}></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.primary,
    height: 70,
  },
  imageBackground: {
    alignItems: "center",
    aspectRatio: 1,
    flex: 1,
    justifyContent: "center",
    // paddingVertical: 30,
  },
  screen: {
    backgroundColor: colors.white,
  },
  square: {
    height: Dimensions.get("window").width / 2.75,
    marginBottom: 20,
    marginHorizontal: 10,
    width: Dimensions.get("window").width / 2.75,
  },
});

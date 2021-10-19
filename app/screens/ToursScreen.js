import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  Dimensions,
  FlatList,
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

function Square({ icon, title }) {
  return (
    <TouchableOpacity style={styles.square}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          color={colors.white}
          size={32}
          style={{ marginTop: 25 }}
        />
      )}
      {title && (
        <Text style={{ color: colors.white, fontSize: 14, fontWeight: "800" }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

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
            marginVertical: 30,
            paddingHorizontal: 40,
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
            marginHorizontal: 30,
          }}
        >
          <Square key={"unlock"} icon={"block-helper"} title={"UNLOCK"} />
          <Square
            key={"continue"}
            icon={"microsoft-internet-explorer"}
            title={"CONTINUE"}
          />
          {getSubscribedToursApi.data.tours?.map((item) => (
            <Square
              key={item.ID}
              // icon={item.title}
              title={item.title}
            />
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
    height: 85,
  },
  screen: {
    backgroundColor: colors.white,
  },
  square: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    height: Dimensions.get("window").width / 2.7,
    justifyContent: "space-between",
    marginBottom: 30,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    width: Dimensions.get("window").width / 2.7,
  },
});

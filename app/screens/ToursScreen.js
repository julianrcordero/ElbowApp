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
import postsApi from "../api/posts";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";

export default function ToursScreen({ navigation }) {
  const getSubscribedToursApi = useApi(postsApi.getSubscribedTours);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = () => {
    getSubscribedToursApi.request();
  };

  const renderItem = ({ item }) => (
    <Card
      // category={item.categories[0]}
      // dataType={item.dataType}
      // thumbnailUrl={item.fileURL}
      hint={item.title}
      // location={item.location}
      // mimeType={item.ID}
      title={item.categories[0]}
      // subTitle={item.scripture}
      // imageUrl={item.images[0].url}
      onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
      // thumbnailUrl={item.imageUrl}
    />
  );

  return (
    <Screen style={styles.screen}>
      <AppText
        style={{
          // borderWidth: 0.5,
          fontSize: 35,
          fontWeight: "bold",
          marginVertical: 15,
          textAlign: "center",
          width: "100%",
        }}
      >
        {"Tours"}
      </AppText>
      {/* {getSubscribedToursApi.error && (
        <>
          <AppText>Couldn't retrieve the posts.</AppText> */}
      <Button title="Retry" onPress={loadTours} />
      {/* </>
      )} */}
      <ActivityIndicator visible={getSubscribedToursApi.loading} />
      {/* <Indicator animating={getSubscribedToursApi.loading} size={"large"} /> */}
      <FlatList
        data={getSubscribedToursApi.data.tours}
        keyExtractor={(listing) => listing.ID.toString()}
        renderItem={renderItem}
        style={{ marginHorizontal: 30 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

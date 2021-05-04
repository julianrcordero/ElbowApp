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
  const getToursApi = useApi(postsApi.getTours);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = () => {
    getToursApi.request();
  };

  return (
    <Screen style={styles.screen}>
      {/* {getToursApi.error && (
        <>
          <AppText>Couldn't retrieve the posts.</AppText> */}
      <Button title="Retry" onPress={loadTours} />
      {/* </>
      )} */}
      <ActivityIndicator visible={getToursApi.loading} />
      {/* <Indicator animating={getToursApi.loading} size={"large"} /> */}
      <FlatList
        data={getToursApi.data.tours}
        keyExtractor={(listing) => listing.ID.toString()}
        renderItem={({ item }) => (
          <Card
            // category={item.categories[0]}
            // dataType={item.dataType}
            // thumbnailUrl={item.fileURL}
            hint={item.categories[0]}
            // location={item.location}
            // mimeType={item.ID}
            title={item.title}
            // subTitle={item.scripture}
            // imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            // thumbnailUrl={item.imageUrl}
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

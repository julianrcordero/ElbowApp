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

export default function LockerScreen({ navigation }) {
  const getPostsApi = useApi(postsApi.getLocker);

  useEffect(() => {
    getPostsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      {/* {getPostsApi.error && (
        <>
          <AppText>Couldn't retrieve the posts.</AppText> */}
      <Button title="Retry" onPress={getPostsApi.request} />
      {/* </>
      )} */}
      <ActivityIndicator visible={getPostsApi.loading} />
      {/* <Indicator animating={getPostsApi.loading} size={"large"} /> */}
      <FlatList
        data={getPostsApi.data.posts}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            category={item.category}
            dataType={item.dataType}
            thumbnailUrl={item.fileURL}
            hint={item.hint}
            location={item.location}
            mimeType={item.mimeType}
            title={`${item.location.lat},\t${item.location.lon}`}
            // title={item.title}
            // subTitle={item.scripture}
            // imageUrl={item.images[0].url}
            // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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

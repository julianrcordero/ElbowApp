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

function PostsScreen({ navigation }) {
  const getPostsApi = useApi(postsApi.getPosts);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    getPostsApi.request();
  };

  const renderItem = ({ item }) => (
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
  );

  const keyExtractor = (listing) => listing.id.toString();

  return (
    <Screen style={styles.screen}>
      <AppText
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginVertical: 15,
          textAlign: "center",
          width: "100%",
        }}
      >
        {"My Posts"}
      </AppText>
      {/* {getPostsApi.error && (
        <>
          <AppText>Couldn't retrieve the posts.</AppText> */}
      <Button title="Retry" onPress={loadPosts} />
      {/* </>
      )} */}
      <ActivityIndicator visible={getPostsApi.loading} />
      {/* <Indicator animating={getPostsApi.loading} size={"large"} /> */}
      <FlatList
        data={getPostsApi.data.posts}
        keyExtractor={keyExtractor}
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

export default PostsScreen;

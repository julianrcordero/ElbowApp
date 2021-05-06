import React, { useEffect, useState } from "react";
import { FlatList, View, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import postsApi from "../api/posts";
import useApi from "../hooks/useApi";
import ListItem from "../components/lists/ListItem";
import Card from "../components/Card";
import Text from "../components/Text";
import AppText from "../components/Text";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const fontSize = 16;

  const [progress, setProgress] = useState(0);
  const [tourPoints, setTourPoints] = useState([]);

  const getPostsApi = useApi(postsApi.getLocker);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await postsApi.searchTourPoints(listing, (progress) =>
        setProgress(progress)
      );

      if (response.ok) setTourPoints(response.data.posts);
      // ...
    }
    getPostsApi.request();
    fetchData();
  }, []);

  // const locker = await postsApi.getLocker();

  // if (!locker.ok) {
  //   // setUploadVisible(false);
  //   console.log(locker);
  //   return Alert.alert(locker.data.message, locker.data.reason, [
  //     { text: "OK", onPress: () => console.log("") },
  //   ]);
  // } else {
  //   if (locker.data.total === 0) {
  //     return Alert.alert("Sorry!", "You have not unlocked any posts yet", [
  //       { text: "OK", onPress: () => console.log("") },
  //     ]);
  //   }
  //   this.setMarkers(locker); //this.props.searchPostsApi);
  //   this.setState({ markersColor: "limegreen" });
  // }

  return (
    <View>
      {listing.images && (
        <Image
          style={styles.image}
          preview={{ uri: listing.images[0].thumbnailUrl }}
          tint="light"
          uri={listing.images[0].url}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        {/* <Text style={styles.scripture}>{listing.ID}</Text> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/gtylogo.jpg")}
              title={listing.userID}
              subTitle="5 Listings"
            />
          </View>
          <AppText
            style={{
              fontSize: fontSize,
              lineHeight: fontSize * 2,
              marginVertical: 15,
            }}
          >
            {listing.categories[0]}
          </AppText>
          {/* {tourPoints
            .filter((tourPost) => tourPost.tourID === listing.ID)
            .map((tourPost) => (
              <Card
                key={tourPost.id}
                hint={tourPost.hint}
                title={tourPost.dataType}
                // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              />
            ))} */}
          <FlatList
            data={tourPoints}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <Card
                category={item.category}
                dataType={item.dataType}
                thumbnailUrl={
                  getPostsApi.data.posts.find((post) => post.id === item.id)
                    ? getPostsApi.data.posts.find((post) => post.id === item.id)
                        .fileURL
                    : null
                }
                hint={item.hint}
                location={item.location}
                mimeType={item.mimeType}
                // title={item.title}
                // subTitle={item.scripture}
                // imageUrl={item.images[0].url}
                // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                // thumbnailUrl={item.imageUrl}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 30,
  },
  image: {
    width: "100%",
    height: 300,
  },
  scripture: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    // marginVertical: 40,
  },
});

export default ListingDetailsScreen;

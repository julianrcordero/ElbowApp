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
  const [user, setUser] = useState();
  const [lockerPoints, setLockerPoints] = useState([]);
  const [tourPoints, setTourPoints] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchLockerPoints();
    fetchTourPoints(); //tourpoints
  }, []);

  const fetchUser = async () => {
    // You can await here
    const response = await postsApi.getUser(listing.userID, (progress) =>
      setProgress(progress)
    );

    if (response.ok) setUser(response.data.email);
    // ...
  };

  const fetchLockerPoints = async () => {
    // You can await here
    const response = await postsApi.getLocker();

    if (response.ok) setLockerPoints(response.data.posts);
    // ...
  };

  const fetchTourPoints = async () => {
    // You can await here
    const response = await postsApi.getTourPoints(listing.ID, (progress) =>
      setProgress(progress)
    );

    if (response.ok) setTourPoints(response.data.posts);
    // ...
  };

  const renderItem = ({ item }) =>
    lockerPoints.find((post) => post.id === item.id) ? (
      <Card
        thumbnailUrl={lockerPoints.find((post) => post.id === item.id).fileURL}
        hint={item.hint}
        title={`${item.location.lat},\t${item.location.lon}`}
      />
    ) : (
      <Card
        hint={item.hint}
        title={`${item.location.lat},\t${item.location.lon}`}
      />
    );

  const keyExtractor = (listing) => listing.id.toString();

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
        <AppText
          style={{
            fontSize: 14,
            // lineHeight: fontSize * 1.5,
            marginTop: 20,
          }}
        >
          {listing.categories[0]}
        </AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/gtylogo.jpg")}
            title={user}
            subTitle="5 Listings"
          />
        </View>
        <FlatList
          data={tourPoints}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={{ flexGrow: 1, height: 450 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 30,
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

  userContainer: {
    marginVertical: 20,
  },
});

export default ListingDetailsScreen;

import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import AppText from "../components/Text";
import VerseCard from "../components/VerseCard";
import { ScrollView } from "react-native-gesture-handler";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const fontSize = 16;

  return (
    <View>
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.scripture}>${listing.scripture}</Text>
        <ScrollView>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/gtylogo.jpg")}
              title="Mosh Hamedani"
              subTitle="5 Listings"
            />
          </View>
          <AppText
            style={{
              fontSize: fontSize,
              lineHeight: fontSize * 2,
            }}
          >
            {listing.content}
          </AppText>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
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
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;

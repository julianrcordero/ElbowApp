import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";

function Card({
  category,
  dataType,
  thumbnailUrl,
  hint,
  location,
  mimeType,
  onPress,
  title,
}) {
  return (
    // category={item.category}
    //       dataType={item.dataType}
    //       thumbnailUrl={item.fileURL}
    //       hint={item.hint}
    //       location={item.location}
    //       mimeType={item.mimeType}
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {thumbnailUrl && (
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={thumbnailUrl} //imageUrl}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {hint}
            {/* {location ? location.lat + ", " + location.lon : hint} */}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginBottom: 7,
  },
});

export default Card;

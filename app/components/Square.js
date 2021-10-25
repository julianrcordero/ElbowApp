import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../config/colors";

export default function Square({
  borderColor = colors.black,
  icon,
  image,
  style = styles.square,
  onPress,
  title,
}) {
  return (
    <TouchableOpacity
      style={[
        style,
        { borderColor: borderColor, borderRadius: 10, borderWidth: 0.5 },
      ]}
      onPress={onPress}
    >
      {icon ? (
        <Image
          source={icon}
          resizeMode="contain"
          style={{ flex: 1, margin: 20 }}
        />
      ) : (
        <ImageBackground
          imageStyle={{
            // backgroundColor: "green",
            borderColor: borderColor,
            borderRadius: 10,
            // borderWidth: 0.5,
          }}
          source={image}
          style={styles.imageBackground}
        >
          {title && (
            <Text
              style={{
                //   backgroundColor: "red",
                color: colors.white,
                fontSize: 8,
                fontWeight: "800",
                textAlign: "left",
                width: "100%",
              }}
            >
              {title}
            </Text>
          )}
        </ImageBackground>
      )}
    </TouchableOpacity>
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
    // justifyContent: "center",
    padding: 7.5,
    // paddingVertical: 30,
  },
});

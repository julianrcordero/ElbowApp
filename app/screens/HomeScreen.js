import React, { useContext } from "react";
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from "../auth/context";
import AppButton from "../components/Button";
import AppText from "../components/Text";
import colors from "../config/colors";
import Square from "../components/Square";

function ButtonSection({
  icon,
  image = require("../assets/michaelScott.jpg"),
  imageOne,
  imageTwo = require("../assets/michaelScott.jpg"),
  more,
  textColor,
  title,
}) {
  return (
    <View style={{}}>
      <Text style={{ fontSize: 14, fontWeight: "800", color: textColor }}>
        {title}
      </Text>
      <View style={styles.squares}>
        <Square
          key={"1"}
          borderColor={textColor}
          icon={icon}
          image={imageOne}
          style={styles.square}
        />
        <Square
          key={"2"}
          borderColor={textColor}
          image={imageTwo}
          style={styles.square}
          // title={"Our First Date"}
        />
        <Square
          key={"3"}
          borderColor={textColor}
          image={image}
          style={styles.square}
          title={"Ania's Favorite View"}
        />
        <Square
          key={"4"}
          borderColor={textColor}
          icon={require("../assets/plusWhite.png")}
          style={styles.square}
          onPress={more}
        />
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {}

    setUser(null);
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundGradient.png")}
      style={styles.container}
    >
      <View style={styles.titleSection}>
        {/* <AppText style={styles.title}>{"My Profile"}</AppText> */}
        <Image
          resizeMode="contain"
          style={styles.title}
          source={require("../assets/myProfile.png")}
        />
        <Text style={{ fontSize: 12, color: colors.primary }}>
          {"Level 1: Scavenger"}
        </Text>
        <View style={styles.level}></View>
      </View>
      <View style={styles.sectionOne}>
        <ButtonSection
          icon={require("../assets/plusWhite.png")}
          title="Recent Posts"
          textColor={colors.white}
        />
        <View style={{ height: 7.5 }}></View>
        <ButtonSection
          icon={require("../assets/plusWhite.png")}
          title="My Tours"
          textColor={colors.white}
          more={() => navigation.navigate("Tours")}
        />
      </View>
      <View style={styles.sectionTwo}>
        <ButtonSection
          imageOne={require("../assets/unlock.png")}
          imageTwo={require("../assets/continue.png")}
          title="My Adventures"
          textColor={colors.primary}
          more={() => navigation.navigate("Adventures")}
        />
      </View>
      <View style={styles.footer}>
        <View style={{ backgroundColor: colors.white, height: 70 }}></View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate("Map")}
        >
          <Image
            resizeMode="contain"
            source={require("../assets/mapIcon.png")}
            style={{ flex: 1 }}
          ></Image>
          {/* <MaterialCommunityIcons name="map" color={colors.primary} size={55} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", bottom: -10 }}
          onPress={logOut}
        >
          <MaterialCommunityIcons
            name="logout"
            color={colors.white}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  footer: {
    backgroundColor: colors.primary,
    height: 140,
  },
  level: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    marginVertical: 5,
    width: "100%",
  },
  mapButton: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    // backgroundColor: colors.white,
    // borderColor: colors.goldenrod,
    // borderRadius: 47.5,
    // borderWidth: 5,
    bottom: 15,
    width: 110,
    justifyContent: "center",
    position: "absolute",
  },
  sectionOne: {
    backgroundColor: colors.transparent,
    // flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 45,
    paddingVertical: 12.5,
  },
  sectionTwo: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 45,
    paddingTop: 12.5,
  },
  square: {
    alignItems: "center",
    aspectRatio: 1,
    // borderRadius: 5,
    // borderWidth: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width / 5.8,
  },
  squares: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    // color: colors.primary,
    // fontSize: 40,
    // fontWeight: "bold",
    height: 40,
    marginBottom: 15,
    width: "60%",
  },
  titleSection: {
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingHorizontal: 45,
    paddingVertical: 25,
  },
});

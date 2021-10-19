import React, { useContext } from "react";
import {
  Button,
  Dimensions,
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

function ButtonSection({ more, textColor, title }) {
  return (
    <>
      <Text style={{ fontSize: 14, fontWeight: "800", color: textColor }}>
        {title}
      </Text>
      <View style={styles.squares}>
        <TouchableOpacity style={[styles.square, { borderColor: textColor }]}>
          <MaterialCommunityIcons name="plus" color={textColor} size={55} />
        </TouchableOpacity>
        <View style={[styles.square, { borderColor: textColor }]}></View>
        <View style={[styles.square, { borderColor: textColor }]}></View>
        <TouchableOpacity
          style={[styles.square, { borderColor: textColor }]}
          onPress={more}
        >
          <MaterialCommunityIcons
            name="dots-horizontal"
            color={textColor}
            size={55}
          />
        </TouchableOpacity>
      </View>
    </>
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
    <View style={{ backgroundColor: "green", flex: 1 }}>
      <View style={styles.titleSection}>
        <AppText style={styles.title}>{"My Profile"}</AppText>
        <Text style={{ fontSize: 12, color: colors.primary }}>
          {"Level 1: Scavenger"}
        </Text>
      </View>
      <View style={styles.sectionOne}>
        <ButtonSection title="Recent Posts" textColor={colors.white} />
        <ButtonSection
          title="My Tours"
          textColor={colors.white}
          more={() => navigation.navigate("Tours")}
        />
      </View>
      <View style={styles.sectionTwo}>
        <ButtonSection title="My Adventures" textColor={colors.primary} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.mapButton} onPress={logOut}>
          <MaterialCommunityIcons name="map" color={colors.primary} size={55} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.primary,
    height: 85,
  },
  mapButton: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderColor: colors.goldenrod,
    borderRadius: 47.5,
    borderWidth: 5,
    bottom: 37.5,
    height: 95,
    justifyContent: "center",
    position: "absolute",
  },
  sectionOne: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  sectionTwo: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  square: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width / 5.6,
  },
  squares: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 7.5,
    paddingBottom: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
    width: "100%",
  },
  titleSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
});

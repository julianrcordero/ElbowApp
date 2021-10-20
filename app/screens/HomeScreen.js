import React, { useContext } from "react";
import {
  Button,
  Dimensions,
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

function ButtonSection({ more, textColor, title }) {
  return (
    <View style={{}}>
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
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={styles.titleSection}>
        <AppText style={styles.title}>{"My Profile"}</AppText>
        <Text style={{ fontSize: 12, color: colors.primary }}>
          {"Level 1: Scavenger"}
        </Text>
        <View
          style={{
            backgroundColor: colors.transparent,
            borderColor: colors.primary,
            borderRadius: 5,
            borderWidth: 1,
            height: 10,
            marginVertical: 5,
            width: "100%",
          }}
        ></View>
      </View>
      <View style={styles.sectionOne}>
        <ButtonSection title="Recent Posts" textColor={colors.white} />
        <View style={{ height: 7.5 }}></View>
        <ButtonSection
          title="My Tours"
          textColor={colors.white}
          more={() => navigation.navigate("Tours")}
        />
      </View>
      <View style={styles.sectionTwo}>
        <ButtonSection
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
          <MaterialCommunityIcons name="map" color={colors.primary} size={55} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.primary,
    height: 140,
  },
  mapButton: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderColor: colors.goldenrod,
    borderRadius: 47.5,
    borderWidth: 5,
    bottom: 22.5,
    height: 95,
    justifyContent: "center",
    position: "absolute",
  },
  sectionOne: {
    backgroundColor: colors.primary,
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
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width / 5.8,
  },
  squares: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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
    justifyContent: "center",
    paddingHorizontal: 45,
    paddingVertical: 25,
  },
});

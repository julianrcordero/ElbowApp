import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function CreateScreen({ navigation }) {
  const navigateToCreatePost = () => navigation.navigate("CreatePost");
  const navigateToCreateTour = () => navigation.navigate("CreateTour");

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={navigateToCreatePost}>
          <Text style={styles.buttonText}>Create a Post</Text>
          <MaterialCommunityIcons
            name={"plus"}
            color={colors.white}
            size={60}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={{ height: 30 }}></View>
        <TouchableOpacity style={styles.button} onPress={navigateToCreateTour}>
          <Text style={styles.buttonText}> Create a Tour</Text>
          <MaterialCommunityIcons
            name={"plus"}
            color={colors.white}
            size={60}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View
          style={{ backgroundColor: "rgba(255,0,255, 0.6)", height: 70 }}
        ></View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => console.log("add")}
        >
          <MaterialCommunityIcons
            name="map-marker-plus-outline"
            color={colors.primary}
            size={55}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    width: "100%",
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "rgba(255,0,255, 0.6)",
    flex: 1,
    paddingHorizontal: 55,
    paddingBottom: 70,
    paddingVertical: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "500",
  },
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.primary,
    height: 70,
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
});

export default CreateScreen;

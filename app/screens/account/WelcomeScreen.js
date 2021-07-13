import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import AppButton from "../../components/Button";

function WelcomeScreen({ navigation }) {
  const navigateToLogin = () => navigation.navigate("Login");

  return (
    <ImageBackground
      // blurRadius={3}
      style={styles.background}
      source={require("../../assets/Elbow2.png")}
    >
      {/* <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/studyBibleAppLogo.jpg")}
        />
        <Text style={styles.tagline}>
          Unleash God's truth, one verse at a time
        </Text>
      </View> */}
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" onPress={navigateToLogin}></AppButton>
        {/* <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        ></AppButton> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    paddingBottom: 100,
    width: "75%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    // paddingVertical: 15,
  },
});

export default WelcomeScreen;

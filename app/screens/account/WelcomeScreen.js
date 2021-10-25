import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";

import AppButton from "../../components/Button";
import colors from "../../config/colors";

function WelcomeScreen({ navigation }) {
  const navigateToLogin = () => navigation.navigate("Login");

  return (
    <ImageBackground
      source={require("../../assets/backgroundGradient.png")}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Image
          source={require("../../assets/ElbowLogo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.buttons}>
        <AppButton
          title="Sign Up"
          onPress={() => console.log("navigate to sign up")}
          color="transparent"
          style={styles.signUp}
          textColor="white"
        ></AppButton>
        <AppButton
          title="Login"
          onPress={navigateToLogin}
          color="white"
          textColor="primary"
        ></AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: { height: 120, marginBottom: 50 },
  logo: {
    justifyContent: "flex-end",
    flex: 1,
  },
  signUp: { borderWidth: 1, borderColor: colors.white, marginTop: 25 },
});

export default WelcomeScreen;

import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppButton from "../../components/Button";
import colors from "../../config/colors";

function WelcomeScreen({ navigation }) {
  const navigateToLogin = () => navigation.navigate("Login");

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/Elbow2.png")}
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
    </View>
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
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: "center",
  },
  image: { height: 200, marginBottom: 50 },
  logo: {
    justifyContent: "flex-end",
    flex: 1,
  },
  signUp: { borderWidth: 1, borderColor: colors.white, marginTop: 25 },
});

export default WelcomeScreen;

import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";

import TextInput from "../../components/TextInput";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";

import colors from "../../config/colors";
import { Formik } from "formik";
import { Auth } from "aws-amplify";

import AuthContext from "../../auth/context";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
      setLoginFailed(false);
    } catch (error) {
      setLoginFailed(true);
    }
  };

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
        <View
          style={{
            alignItems: "center",
            flex: 5 / 6,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={loginFailed} visible={loginFailed} />
            <View style={{ alignItems: "center", width: "100%" }}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Username"
                textContentType="emailAddress"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <SubmitButton title="Login" />
          </AppForm>
          <Text
            style={{
              color: colors.white,
              fontWeight: "700",
              // marginVertical: 20
            }}
          >
            Forgot Password?
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: "center",
    flex: 1,
    // justifyContent: "space-evenly",
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
});

export default LoginScreen;

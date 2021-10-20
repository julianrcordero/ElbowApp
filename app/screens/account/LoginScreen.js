import React, { useContext, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/Elbow2.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.buttons}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={loginFailed} visible={loginFailed} />
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
          <SubmitButton title="Login" />
        </AppForm>
        <Text
          style={{ color: colors.white, fontWeight: "700", marginVertical: 20 }}
        >
          Forgot Password?
        </Text>
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
  image: { height: 200, marginVertical: 50 },
  logo: {
    justifyContent: "flex-end",
    flex: 1,
  },
});

export default LoginScreen;

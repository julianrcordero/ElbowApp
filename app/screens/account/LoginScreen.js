import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import TextInput from "../../components/TextInput";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import authApi from "../../api/auth";

import colors from "../../config/colors";
import { Formik } from "formik";
import useAuth from "../../auth/useAuth";
import { Auth } from "aws-amplify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      setLoginFailed(false);

      auth.logIn(
        user.signInUserSession.idToken.jwtToken,
        user.signInUserSession.accessToken.jwtToken,
        user.signInUserSession.refreshToken.token
      );
    } catch (error) {
      setLoginFailed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/ElbowText.png")}
      />
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
          placeholder="Email"
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
        <SubmitButton
          title="Login"
          // onPress={() => navigation.navigate("Account")}
        />
      </AppForm>
      {/* <Button
        style={styles.button}
        title={"Forgot Password"}
        onPress={() => navigation.navigate("ForgotPassword")}
      ></Button> */}
    </View>
  );

  // _login = async () => {
  //   if (
  //     userInfo.email === state.email &&
  //     userInfo.password === state.password
  //   ) {
  //     alert("Logged In");
  //   } else {
  //     alert("Incorrect");
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 50,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;

// onSubmit={(values) => {
//   fetch(
//     "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signin",
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         email: values.email,
//         password: values.password,
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.statusCode == 200) {
//         navigation.navigate("Account", {
//           AccessToken: data.body.data.AuthenticationResult.AccessToken,
//         });
//       } else {
//         const message = data.body.message;
//       }
//     })
//     .catch((e) => {
//     });
// }}

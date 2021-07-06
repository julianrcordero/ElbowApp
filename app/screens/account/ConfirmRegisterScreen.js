import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import authApi from "../../api/auth";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import ActivityIndicator from "../../components/ActivityIndicator";

import {
  AppForm as Form,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required()
    .min(6) //test("len", "Code must be 6 digits", (label) => val.length === 5)
    .label("Code"),
});

function ConfirmRegisterScreen({ route, navigation }) {
  const confirmsignupApi = useApi(authApi.confirmsignup);
  const loginApi = useApi(authApi.signin);
  const auth = useAuth();
  const [error, setError] = useState();

  const { email, password } = route.params;

  const handleSubmit = async ({ email, password, code }) => {
    const result = await confirmsignupApi.cognitorequest(email, password, code);

    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    } else if (result.data.statusCode !== 200) {
      setError(result.data.body.message);
      return;
    }

    const result2 = await loginApi.cognitorequest(email, password);
    auth.logIn(
      result2.data.body.data.AuthenticationResult.IdToken,
      result2.data.body.data.AuthenticationResult.AccessToken
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/gtylogo.jpg")}
        />
        <Form
          initialValues={{
            email: email,
            password: password,
            code: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="code"
            placeholder="6-Digit Verification Code"
            keyboardType="phone-pad"
            //   textContentType=""
          />
          <SubmitButton
            title="Confirm Registration"
            // onPress={() => navigation.navigate("Account")}
          />
        </Form>
      </View>
      <ActivityIndicator
        visible={confirmsignupApi.loading || loginApi.loading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default ConfirmRegisterScreen;

// (values) => {
//   fetch(
//     "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/confirm-signup",
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         email: values.email,
//         password: values.password,
//         code: values.code,
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.statusCode == 200) {
//         fetch(
//           "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signin",
//           {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json;charset=UTF-8",
//             },
//             method: "POST",
//             body: JSON.stringify({
//               email: values.email,
//               password: values.password,
//             }),
//           }
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.statusCode == 200) {
//               navigation.navigate("Account", {
//                 AccessToken:
//                   data.body.data.AuthenticationResult.AccessToken,
//               });
//             } else {
//             }
//           })
//           .catch((e) => {
//           });
//       } else {
//       }
//     })
//     .catch((e) => {
//     });
// }

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/account/WelcomeScreen";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";
import ConfirmRegisterScreen from "../screens/account/ConfirmRegisterScreen";
import ForgotPasswordScreen from "../screens/account/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/account/ResetPasswordScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        title: "",
      }}
    />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ConfirmRegister" component={ConfirmRegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

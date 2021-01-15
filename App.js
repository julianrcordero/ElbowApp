import React, { useState } from "react";
import { Button, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "./app/config/colors";
import Screen from "./app/components/Screen";

import BibleListingsScreen from "./app/screens/BibleListingsScreen";
import BibleListingDetailsScreen from "./app/screens/BibleListingDetailsScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";

import BibleScreen from "./app/screens/BibleScreen";
import AccountScreen from "./app/screens/account/AccountScreen";
import ConfirmRegisterScreen from "./app/screens/account/ConfirmRegisterScreen";
import ForgotPasswordScreen from "./app/screens/account/ForgotPasswordScreen";
import LoginScreen from "./app/screens/account/LoginScreen";
import MessagesScreen from "./app/screens/account/MessagesScreen";
import RegisterScreen from "./app/screens/account/RegisterScreen";
import ResetPasswordScreen from "./app/screens/account/ResetPasswordScreen";
import WelcomeScreen from "./app/screens/account/WelcomeScreen";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
// import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="TweetDetails" component={TweetDetails} />
  </Stack.Navigator>
);

const Account = () => (
  <Screen>
    <Text>Account</Text>
  </Screen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={Tweets} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

const Link = () => {
  const navigation = useNavigation();

  return (
    <Button title="Click" onPress={() => navigation.navigate("TweetDetails")} />
  );
};

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    <Button
      title="View Tweet"
      onPress={() => navigation.navigate("TweetDetails", { id: 1 })}
    />
  </Screen>
);

const TweetDetails = ({ route }) => (
  //useRoute()
  <Screen>
    <Text>Tweet Details {route.params.id}</Text>
  </Screen>
);

//View -> UIView
export default function App() {
  // const netInfo = useNetInfo();
  //netInfo.isInternetReachable
  //<Button disabled={!netInfo.isInternetReachable} />

  // const demo = async () => {
  //   try {
  //     await AsyncStorage.setItem("person", JSON.stringify({ id: 1 }));
  //     const value = await AsyncStorage.getItem("person");
  //     const person = JSON.parse(value);
  //     console.log(person);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // demo();

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  // const insets = useSafeArea();
  // console.log(insets.bottom + ", " + insets.top);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    // <View style={{ backgroundColor: "black" }}>
    <Screen>
      {/* <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        // onChangeImage={(uri) => setImageUris(uri)}
      /> */}
      {/* <OfflineNotice /> */}
      <NavigationContainer ref={navigationRef}>
        <AuthContext.Provider value={{ user, setUser }}>
          {/* <AppNavigator user={{ user }} /> */}
          {user ? <AppNavigator /> : <AuthNavigator />}
        </AuthContext.Provider>
      </NavigationContainer>
    </Screen>
    // </View>

    //   //Button with yes/no alert
    //   // <SafeAreaView style={[styles.container, containerStyle]}>
    //   //   <Button
    //   //     title="Get Started"
    //   //     onPress={() =>
    //   //       //IOS ONLY
    //   //       // Alert.prompt("Welcome", "Introducing The Study Bible 2.0", (text) =>
    //   //       //   console.log(text)
    //   //       // )

    //   //       Alert.alert("Welcome", "Introducing The Study Bible 2.0", [
    //   //         { text: "Yes", onPress: () => console.log() },
    //   //         { text: "No", onPress: () => console.log("No") },
    //   //       ])
    //   //     }
    //   //   />

    //   //Image with highlight
    //   // </SafeAreaView>
    //   // <SafeAreaView style={styles.container}>
    //   //   <Text numberOfLines={1} onPress={handlePress}>
    //   //     The Study Bible
    //   //   </Text>
    //   //   <TouchableHighlight onPress={() => console.log("Image tapped")}>
    //   //     <Image
    //   //       // blurRadius={10}
    //   //       // fadeDuration={1000}
    //   //       source={{
    //   //         width: 200,
    //   //         height: 300,
    //   //         uri: "https://picsum.photos/200/300",
    //   //       }}
    //   //     />
    //   //   </TouchableHighlight>
    //   // </SafeAreaView>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Listings">
      <Stack.Screen
        name="Listings"
        options={({ route }) => ({
          // title: "route.params.id",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#345171",
          },
          headerTintColor: colors.white,
        })}
        component={BibleListingsScreen}
      />
      <Stack.Screen
        name="BibleListingDetails"
        component={BibleListingDetailsScreen}
      />
      <Stack.Screen name="ListingEditScreen" component={ListingEditScreen} />
    </Stack.Navigator>
  );
}

function JohnsNotesStack() {
  return (
    <Stack.Navigator initialRouteName="ListingEditScreen">
      <Stack.Screen name="BibleListings" component={BibleListingsScreen} />
      <Stack.Screen
        name="BibleListingDetails"
        component={BibleListingDetailsScreen}
      />
      <Stack.Screen name="ListingEditScreen" component={ListingEditScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        options={() => ({ headerShown: true })}
        component={LoginScreen}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen
        name="Register"
        options={() => ({ headerShown: true })}
        component={RegisterScreen}
      />
      <Stack.Screen name="ConfirmRegister" component={ConfirmRegisterScreen} />
      <Stack.Screen name="BibleAccount" component={BibleAccountScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

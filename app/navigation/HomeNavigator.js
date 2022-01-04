import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import ToursNavigator from "./ToursNavigator";
import LockerNavigator from "./LockerNavigator";
import MapScreen from "../screens/MapScreen";
import CreateScreen from "../screens/CreateScreen";
import useApi from "../hooks/useApi";
import postsApi from "../api/posts";
import useNotifications from "../hooks/useNotifications";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  // useNotifications();
  const getPostsApi = useApi(postsApi.getPosts);
  const searchPostsApi = useApi(postsApi.searchPosts);

  return (
    <Stack.Navigator
      mode="card"
      screenOptions={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={colors.white}
              size={40}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: colors.goldenrod,
          height: 60,
        },
        headerTintColor: colors.white,
        title: "",
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: false,
        }}
      />
      <Stack.Screen name="Tours" component={ToursNavigator} />
      <Stack.Screen name="Adventures" component={LockerNavigator} />
      <Stack.Screen
        name="Map"
        children={() => (
          <MapScreen
            // ref={props.mapView}
            bottomSheetRef={props.bottomSheetRef}
            bottomSheetContent={props.bottomSheetContent}
            carousel={props.carousel}
            getPostsApi={getPostsApi}
            map={props.map}
            mapView={props.mapView}
            ref={props.map}
            searchPostsApi={searchPostsApi}
            user={props.user}
          />
        )}
        options={{
          headerStyle: {
            backgroundColor: colors.goldenrod,
            height: 60,
          },
        }}
      />
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

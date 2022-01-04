import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LockerNavigator from "./LockerNavigator";
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import PostContentScreen from "../screens/PostContentScreen";
import MapScreen from "../screens/MapScreen";
import SubscribeTourScreen from "../screens/SubscribeTourScreen";

import useNotifications from "../hooks/useNotifications";
import Animated from "react-native-reanimated";
import MenuButton from "../components/MenuButton";
import colors from "../config/colors";
import postsApi from "../api/posts";
import useApi from "../hooks/useApi";
import NewListingButton from "./NewListingButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToursScreen from "../screens/ToursScreen";
import ToursNavigator from "./ToursNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = (props) =>
  // { user }
  {
    // useNotifications();

    const getPostsApi = useApi(postsApi.getPosts);
    const searchPostsApi = useApi(postsApi.searchPosts);

    return (
      <Tab.Navigator
        initialRouteName="Map"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{}}
      >
        <Tab.Screen
          name="Locker"
          component={LockerNavigator}
          options={{
            tabBarIcon: "locker",
          }}
        />
        <Tab.Screen
          name="My Posts"
          component={FeedNavigator}
          options={{
            tabBarIcon: "newspaper-variant-multiple-outline",
          }}
        />
        <Tab.Screen
          name="Map"
          // component={MapScreen}
          options={{
            tabBarIcon: "map",
          }}
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
        />
        {/* <Tab.Screen
          name="New Post"
          component={PostContentScreen}
          options={({ navigation }) => ({
            // tabBarButton: () => (
            //   <NewListingButton
            //     onPress={}
            //   />
            // ),
            tabBarIcon: "plus-circle",
          })}
        /> */}
        <Tab.Screen
          name="Tours"
          component={ToursNavigator}
          options={{
            tabBarIcon: "map-marker-path",
          }}
        />
        <Tab.Screen
          name="More"
          // component={AccountNavigator}
          options={{
            tabBarIcon: "menu",
          }}
          children={() => <AccountNavigator />}
        />
      </Tab.Navigator>
    );
  };

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <Animated.View
      style={{
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        backgroundColor: colors.light,
        // transform: [{ translateY: navigationY }],
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <MenuButton
            key={route.key}
            title={label}
            icon={icon} //{require("./app/assets/home.png")}
            onPress={onPress}
            color={isFocused ? colors.medium : colors.black}
          ></MenuButton>
        );
      })}
    </Animated.View>
  );
}

export default AppNavigator;

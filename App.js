import Amplify, { Auth } from "aws-amplify";
// import awsconfig from "./aws-exports";
import { amplifyConfig } from "./amplifyconfig";
Amplify.configure(amplifyConfig);

import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, FlatList, View, Switch, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import Slider from "@react-native-community/slider";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import colors from "./app/config/colors";

import Screen from "./app/components/Screen";
import BottomSheetToolBar from "./app/components/BottomSheetToolBar";
import CarouselCard from "./app/components/CarouselCard";

import BottomSheet from "reanimated-bottom-sheet";
import { enableScreens } from "react-native-screens";
enableScreens();
import Collapsible from "react-native-collapsible";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";

import { createStackNavigator } from "@react-navigation/stack";
import TopSheetNavigation from "./app/components/TopSheetNavigation";
import PostContentScreen from "./app/screens/PostContentScreen";
import Carousel from "./app/components/Carousel";
import * as Location from "expo-location";
const Stack = createStackNavigator();
const { height, width } = Dimensions.get("window");

//View -> UIView
export default function App() {
  const top = height - Constants.statusBarHeight;
  const bottomSheetHeaderHeight = 50;
  const verseCardReferenceHeight = 50;

  const [fontSize, setFontSize] = useState(16);
  const crossrefSize = 12; //fontSize * 0.6;
  const titleSize = fontSize * 1.5;
  const handleSlide = (value) => setFontSize(value);

  const topPanel = React.useRef();
  const mapView = useRef(null);
  const map = useRef(null);
  const carousel = React.useRef();
  const bottomSheetContent = useRef();

  const [] = useState(1);
  const [] = useState(1);

  const bottomSheetRef = React.useRef(null);

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    // const user = await authStorage.getUser();
    const user = await Auth.currentUserInfo();

    // const idToken = session.getIdToken().getJwtToken(); //authStorage.getIdToken();
    if (user) {
      setUser(user);
    }
  };

  const snapToHalf = () => {
    bottomSheetRef.current?.snapTo(2);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  // const renderAddPostHeader = () => (
  //   <View style={[styles.header, { backgroundColor: colors.light }]}>
  //     <Text style={{ fontSize: 20, fontWeight: "bold" }}>Post content</Text>

  //     <Button
  //       title="Done"
  //       onPress={snapToHalf}
  //       style={{ textAlign: "center" }}
  //     />
  //   </View>
  // );

  const postViewHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      {/* <BottomSheetToolBar /> */}
      <View></View>
      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderCarousel = () => (
    <Carousel
      bottomSheetHeaderHeight={bottomSheetHeaderHeight}
      bottomSheetRef={bottomSheetRef}
      carousel={carousel}
      crossrefSize={crossrefSize}
      fontSize={fontSize}
      map={map}
      mapView={mapView}
      ref={bottomSheetContent}
      top={top}
      user={user}
      verseCardReferenceHeight={verseCardReferenceHeight}
      width={width}
    />
  );

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <>
      <Screen style={{ position: "absolute", width: "100%", zIndex: 200 }}>
        <TopSheetNavigation ref={topPanel} width={width} />
      </Screen>
      <Screen>
        <NavigationContainer ref={navigationRef}>
          <AuthContext.Provider value={{ user, setUser }}>
            {user ? (
              <AppNavigator
                bottomSheetRef={bottomSheetRef}
                bottomSheetContent={bottomSheetContent}
                carousel={carousel}
                // currentBook={currentBook}
                fontSize={fontSize}
                crossrefSize={crossrefSize}
                titleSize={titleSize}
                topPanel={topPanel}
                map={map}
                mapView={mapView}
                user={user}
              />
            ) : (
              <AuthNavigator />
            )}
          </AuthContext.Provider>
        </NavigationContainer>
      </Screen>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[top, "35%", "0%"]}
        initialSnap={2}
        renderHeader={postViewHeader} // : postViewHeader}
        renderContent={renderCarousel}
        style={{ backgroundColor: colors.white, minHeight: height }}
        // onCloseEnd={() => setFocusedVerse(null)}
      />
    </>
  );
}

const styles = {
  settings: {
    marginTop: 25,
    width: "100%",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.medium,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 6,
    paddingVertical: 6,
    textAlign: "center",
  },
  title: {
    marginVertical: 6,
  },
};

import Amplify, { Auth } from "aws-amplify";
// import awsconfig from "./aws-exports";
import { amplifyConfig } from "./amplifyconfig";
Amplify.configure(amplifyConfig);

import React, { useCallback, useRef, useState } from "react";
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
import PostCard from "./app/components/PostCard";

import BottomSheet from "reanimated-bottom-sheet";
import { enableScreens } from "react-native-screens";
enableScreens();
import Collapsible from "react-native-collapsible";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";

import { createStackNavigator } from "@react-navigation/stack";
import TopSheetNavigation from "./app/components/TopSheetNavigation";
import PostContentScreen from "./app/screens/PostContentScreen";
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
  const _map = useRef(null);

  const [addPostMode, setAddPostMode] = useState(true);
  const [markerList, setMarkerList] = useState([]);
  const carousel = React.useRef();

  const [] = useState(1);
  const [] = useState(1);

  const bottomSheetRef = React.useRef(null);

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const snapToHalf = () => {
    bottomSheetRef.current.snapTo(2);
  };

  const renderAddPostHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.light }]}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Post content</Text>

      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderAddPostMode = () => (
    <View style={{ backgroundColor: colors.white, width: width }}>
      <PostContentScreen
        bottomSheetRef={bottomSheetRef}
        markerList={markerList}
        setMarkerList={setMarkerList}
      />
    </View>
  );

  const postViewHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.white }]}>
      {/* <BottomSheetToolBar /> */}
      <View></View>
      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderPostCardItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "white",
          // flex: 1,
          width: width,
          paddingHorizontal: 30,
        }}
      >
        <PostCard
          key={index}
          // currentBook={currentBook}
          item={item}
          crossrefSize={crossrefSize}
          fontSize={fontSize}
          height={top - bottomSheetHeaderHeight - getBottomSpace()}
          bottomSheetRef={bottomSheetRef}
          markerList={markerList}
          setMarkerList={setMarkerList}
          verseCardReferenceHeight={verseCardReferenceHeight}
        />
      </View>
    );
  };

  const slideToMarker = (item) => {
    if (_map.current) {
      // console.log("Zoom: " + _map.current.description);
      _map.current.animateCamera(
        {
          center: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          zoom: 10,
        },
        { duration: 500 }
      );
    }
  };

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      slideToMarker(viewableItems.viewableItems[0].item);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  });

  const postViewData = () => (
    <View
      style={{
        height: top - 50,
      }}
    >
      {_map.current ? (
        <FlatList
          bounces={false}
          data={markerList}
          decelerationRate={"fast"}
          extraData={_map.current.state.markers}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          horizontal={true}
          initialNumToRender={5}
          keyExtractor={(item, index) => item + index}
          // onScrollEndDrag={slideToMarker}
          ref={carousel}
          renderItem={renderPostCardItem}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"start"}
          snapToInterval={width}
          style={{ backgroundColor: colors.white }}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 75,
          }}
        />
      ) : null}
    </View>
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
                carousel={carousel}
                // currentBook={currentBook}
                fontSize={fontSize}
                crossrefSize={crossrefSize}
                titleSize={titleSize}
                setAddPostMode={setAddPostMode}
                setMarkerList={setMarkerList}
                topPanel={topPanel}
                markerList={markerList}
                _map={_map}
              />
            ) : (
              <AuthNavigator />
            )}
          </AuthContext.Provider>
        </NavigationContainer>
      </Screen>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[top, "50%", "0%"]}
        initialSnap={2}
        renderHeader={addPostMode ? renderAddPostHeader : postViewHeader}
        renderContent={addPostMode ? renderAddPostMode : postViewData}
        style={{ backgroundColor: colors.white }}
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
    borderTopWidth: 0.2,
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

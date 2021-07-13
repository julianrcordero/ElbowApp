import React, { Component } from "react";
import {
  Alert,
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import PanelBox from "./PanelBox";
import AppText from "./Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostContentScreen from "../screens/PostContentScreen";
import UnlockScreen from "../screens/UnlockScreen";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "./Button";
import { useState } from "react";
import postsApi from "../api/posts";

export default class CarouselCard extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.description !== nextProps.description) {
      return true;
    } else if (this.props.title !== nextProps.title) {
      return true;
    } else if (this.props.url !== nextProps.url) {
      return true;
    } else if (this.state.progress !== nextState.progress) {
      return true;
    } else if (this.state.uploadVisible !== nextState.uploadVisible) {
      return true;
    }
    return false;
  }

  state = {
    progress: 0,
    uploadVisible: false,
  };

  handleUnlock = async () => {
    this.setState({ progress: 0, uploadVisible: true });

    let map = this.props.map.current;

    const result = await postsApi.unlockListing(
      {
        id: this.props.id,
        lat: map.state.myLocation.latitude,
        lon: map.state.myLocation.longitude,
      },
      (progress) => this.setState({ progress: progress })
    );

    if (!result.ok) {
      this.setState({ uploadVisible: false });
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => {} },
        // { text: "No", onPress: () => {} },
      ]);
    } else {
      const resultData = result.data;
      map.showLockerPosts(); //.current?.setState({tourFilteredList: })

      const interactionPromise = InteractionManager.runAfterInteractions(() => {
        let myIndex = map.state.tourFilteredList.findIndex(
          (obj) => obj.id === resultData.PostID
        );

        setTimeout(() => {
          this.props.carousel.current?.scrollToIndex({
            animated: false,
            index: myIndex,
          });
        });
      });
      () => interactionPromise.cancel();
    }

    // verseCard.setState({ editing: false });
  };

  handleDelete = async () => {
    // this.setState({ progress: 0, uploadVisible: true });

    const result = await postsApi.deleteListing(this.props.id, (progress) =>
      this.setState({ progress: progress })
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => {} },
        // { text: "No", onPress: () => {} },
      ]);
    } else {
      let myMap = this.props.map.current;

      myMap?.setState({
        tourFilteredList: myMap?.state.tourFilteredList.filter(
          (mapPoint) => mapPoint.id !== this.props.id
        ),
      });
    }
  };

  handleSubscribe = async () => {
    // this.setState({ progress: 0, uploadVisible: true });

    const result = await postsApi.subscribeTour(this.props.tourID, (progress) =>
      this.setState({ progress: progress })
    );
    this.props.loadTours();

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => {} },
        // { text: "No", onPress: () => {} },
      ]);
    } else {
      Alert.alert("Successfully subscribed to tour!", "yeah man", [
        { text: "OK", onPress: () => {} },
        // { text: "No", onPress: () => {} },
      ]);
    }
  };

  render() {
    const {
      description,
      fontSize,
      height,
      subscribedTours,
      title,
      tourID,
      url,
      user,
      userID,
      width,
    } = this.props;

    return (
      <>
        <ActivityIndicator visible={this.state.uploadVisible} />
        <View
          style={{
            height: height,
            marginVertical: 15,
            padding: 30,
            width: width,
          }}
        >
          {/* <UnlockScreen
          onDone={() => this.setState({ uploadVisible: false })}
          progress={this.state.progress}
          visible={this.state.uploadVisible}
        /> */}
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                alignItems: "center",
                flex: 1,
              }}
            >
              <AppText
                style={{
                  borderWidth: 0.5,
                  fontSize: 35,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {description}
              </AppText>

              <View
                style={{
                  alignItems: "center",
                  // backgroundColor: "yellow",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 20,
                  width: "75%",
                }}
              >
                <AppText
                  style={{
                    fontSize: fontSize,
                    textAlign: "center",
                  }}
                >
                  {"Content type: \t" + title}
                </AppText>
                {/* <AppButton
                  title={"Edit"}
                  onPress={() => {
                    this.setState({ editing: true });
                  }}
                /> */}
                {!url && (
                  <MaterialCommunityIcons
                    name="lock"
                    color={"grey"}
                    size={50}
                  />
                )}
              </View>
            </View>
          </View>
          {/* <AppText
          style={{
            fontSize: fontSize,
            textAlign: "center",
          }}
        >
          {userID}
        </AppText> */}
          {url ? (
            <Image
              resizeMode={"contain"}
              style={styles.image}
              tint="light"
              preview={{ uri: url }}
              uri={url} //imageUrl}
            />
          ) : (
            <AppButton title={"Unlock"} onPress={this.handleUnlock} />
          )}
          {userID === user.sub && (
            <AppButton title={"Delete"} onPress={this.handleDelete} />
          )}
          {tourID.length > 0 &&
            (subscribedTours.find(
              (subscribedTour) => subscribedTour.ID === tourID
            ) ? (
              <AppText>{"You are already subscribed to this tour"}</AppText>
            ) : (
              <AppButton title={"Subscribe"} onPress={this.handleSubscribe} />
            ))}
          {/* <PanelBox
              fontSize={fontSize}
              verseContent={description}
              johnsNote={johnsNote}
              crossrefs={crossrefs}
              crossRefSize={crossRefSize}
              bottomSheetRef={bottomSheetRef}
            ></PanelBox> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    borderWidth: 2,
    backgroundColor: "white",
    width: "85%",
    height: "50%",
  },
});

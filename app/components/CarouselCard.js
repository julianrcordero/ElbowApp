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
import AppButton from "./Button";
import useLocation from "../hooks/useLocation";
import { useState } from "react";
import postsApi from "../api/posts";

export default class CarouselCard extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.description !== nextProps.description) {
      // console.log("description is different");
      return true;
    } else if (this.props.title !== nextProps.title) {
      // console.log("title is different");
      return true;
    } else if (this.props.url !== nextProps.url) {
      // console.log("url is different", this.props.description);
      return true;
    } else if (this.props.location !== nextProps.location) {
      console.log("location is different", this.props.location);
      return true;
    }
    return false;
  }

  state = {
    location: {
      latitude: 34.2709266,
      longitude: -118.5139665,
    },
    progress: 0,
    uploadVisible: false,
  };

  handleUnlock = async () => {
    this.setState({ progress: 0, uploadVisible: true });

    console.log("unlocking this:", this.props.id);
    this.props.getCurrentLocation();
    // console.log("attempting to unlock from", this.props.location);

    const result = await postsApi.unlockListing(
      this.props.id,
      this.props.location,
      // { lat: 34.26626838473331, lon: -118.3768829221343 },
      (progress) => this.setState({ progress: progress })
    );
    // console.log(result);

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
      ]);
    } else {
      const resultData = result.data;
      // console.log(("resultData", resultData));
      this.props.map.current?.showLockerPosts(); //.current?.setState({tourFilteredList: })

      const interactionPromise = InteractionManager.runAfterInteractions(() => {
        let myIndex = this.props.map.current?.state.tourFilteredList.findIndex(
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

    console.log("deleting this:", this.props.id);
    // console.log("attempting to unlock from", this.props.location);
    const result = await postsApi.deleteListing(this.props.id, (progress) =>
      this.setState({ progress: progress })
    );
    console.log(result);

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
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

    console.log("subscribing to this:", this.props.tourID);
    // console.log("attempting to unlock from", this.props.location);
    const result = await postsApi.subscribeTour(this.props.tourID, (progress) =>
      this.setState({ progress: progress })
    );
    this.props.loadTours();

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
      ]);
    } else {
      Alert.alert("Successfully subscribed to tour!", "yeah man", [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
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
      <View
        style={{
          // backgroundColor: "cyan",
          height: height,
          marginVertical: 15,
          paddingHorizontal: 30,
          width: width,
        }}
      >
        <View
          style={{
            alignItems: "center",
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <AppText
              style={{
                fontSize: fontSize,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {description + " (" + title + ")"}
            </AppText>

            {/* <AppButton
                  title={"Edit"}
                  onPress={() => {
                    console.log("Edit clicked");
                    this.setState({ editing: true });
                  }}
                /> */}
            {!url && (
              <MaterialCommunityIcons
                name="lock"
                color={colors.black}
                size={28}
              />
            )}
          </View>
        </View>
        <AppText
          style={{
            fontSize: fontSize,
            textAlign: "center",
          }}
        >
          {userID}
        </AppText>
        {url ? (
          <Image
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
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

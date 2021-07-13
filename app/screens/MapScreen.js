import React from "react";
import { Component } from "react";
import {
  Alert,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MapView, {
  Animated,
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import postsApi from "../api/posts"; //"../api/posts"

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    region: null,
    initialMarkers: [],
    tourFilteredList: [],
    locker: [],
    lockerLoaded: false,
    markerList: [],
    markersColor: "dodgerblue",
    myLocation: {
      latitude: 34.0195,
      longitude: -118.4912,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    placeMarkerMode: false,
    placeMarkerCoordinate: { latitude: 0, longitude: 0 },
    progress: 0,
  };

  componentDidMount() {
    this.setState({ placeMarkerMode: false });

    // this.getCurrentLocation();
    this.moveCamera(
      this.state.myLocation.latitude,
      this.state.myLocation.longitude
    );

    this.loadLocker();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.region !== this.state.region) {
      console.log("updated region");
    } else if (prevState.placeMarkerMode !== this.state.placeMarkerMode) {
      console.log("placeMarkerMode:", this.state.placeMarkerMode);
    } else if (prevState.myLocation !== this.state.myLocation) {
      console.log(
        "my location:",
        this.state.myLocation.latitude,
        this.state.myLocation.longitude
      );

      if (this.state.region === null) {
        this.setState(
          {
            region: {
              latitude: this.state.myLocation.latitude,
              longitude: this.state.myLocation.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.0421,
            },
          },
          console.log("region set to myLocation")
        );
      }
    } else if (
      prevState.placeMarkerCoordinate !== this.state.placeMarkerCoordinate
    ) {
      console.log("updated marker location");
    }
  }

  async loadLocker() {
    if (this.props.user) {
      const locker = await postsApi.getLocker();

      let setToThis = Array.isArray(locker.data.posts)
        ? locker.data.posts
        : locker.data[1].posts; //for some reason????
      if (setToThis) this.setState({ locker: setToThis, lockerLoaded: true });
    }
  }

  moveCamera = (latitude, longitude, zoom) => {
    this.props.mapView.current?.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        zoom: zoom,
      },
      2000
    );
  };

  clickToMarker = (marker) => {
    // this.props.bottomSheetRef.current?.snapTo(1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.moveCamera(marker.latitude, marker.longitude);
      });
    });
    () => interactionPromise.cancel();
    this.openBottomSheet(false);
    this.scrollToPost(marker);
  };

  openBottomSheet = (postMode) => {
    this.props.bottomSheetRef.current?.snapTo(1);
    this.props.bottomSheetContent.current?.setState({ addPostMode: postMode });
  };

  scrollToPost = (marker) => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.props.map.current?.state.tourFilteredList.findIndex(
        (m) => m.id === marker.id
      );

      setTimeout(() => {
        this.props.carousel.current?.scrollToIndex({
          animated: false,
          index: myIndex,
        });
      });
    });
    () => interactionPromise.cancel();
  };

  //GREEN BUTTON
  showLockerPosts = async () => {
    const result = await postsApi.getLocker();

    if (result.data.total === 0) {
      return Alert.alert("Sorry!", "You have not unlocked any posts yet", [
        { text: "OK", onPress: () => {} },
      ]);
    }
    this.setMarkers(result, "limegreen");
    this.props.bottomSheetContent.current?.setState({
      filter: 0,
    });
  };

  //BLUE BUTTON
  showMyPosts = async () => {
    const result = await postsApi.getPosts(); //posts from self

    this.setMarkers(result, "dodgerblue");
    this.props.bottomSheetContent.current?.setState({
      filter: 0,
    });
  };

  //RED BUTTON
  searchMarkers = async () => {
    const result = await postsApi.searchPosts(this.state.region, (progress) =>
      this.setState({ progress: progress })
    );

    this.setMarkers(result, "crimson");
    this.props.bottomSheetContent.current?.setState({
      filter: 0,
    });
  };

  setMarkers = (result, color) => {
    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => {} },
        // { text: "No", onPress: () => {} },
      ]);
    } else {
      if (!result.error) {
        const resultData = result.data.posts;

        let initialMarkers = [];

        if (resultData) {
          if (color === "crimson") {
            // if (!this.state.lockerLoaded) {
            this.loadLocker();
            // }
            resultData
              .filter(
                (searchedPost) =>
                  searchedPost.userID !== this.props.user.sub &&
                  this.state.locker.find(
                    (lockerPost) => lockerPost.id === searchedPost.id
                  ) === undefined
              )
              .map(
                (post) =>
                  (initialMarkers = [
                    ...initialMarkers,
                    {
                      id: post.id,
                      latitude: post.location.lat,
                      longitude: post.location.lon,
                      title: post.category,
                      description: post.hint,
                      url: post.fileURL,
                      tourID: post.tourID,
                      userID: post.userID,
                    },
                  ])
              );
          } else {
            resultData.map(
              (post) =>
                (initialMarkers = [
                  ...initialMarkers,
                  {
                    id: post.id,
                    latitude: post.location.lat,
                    longitude: post.location.lon,
                    title: post.category,
                    description: post.hint,
                    url: post.fileURL,
                    tourID: post.tourID,
                    userID: post.userID,
                  },
                ])
            );
          }
        } else {
        }
        if (initialMarkers.length === 0) {
          Alert.alert("Ain't nothing 'round heeAh ta see", "okah", [
            { text: "OK", onPress: () => {} },
            // { text: "No", onPress: () => {} },
          ]);
        } else {
        }

        this.setState({
          markerList: initialMarkers,
          tourFilteredList: initialMarkers,
          markersColor: color,
        });
      } else {
      }
    }
  };

  mapPadding = { bottom: 70 };
  mapStyle = { flex: 1 };

  onRegionChangeComplete = (region) => {
    if (
      region.latitude.toFixed(6) === this.state.region.latitude.toFixed(6) &&
      region.longitude.toFixed(6) === this.state.region.longitude.toFixed(6)
    ) {
      return;
    }

    this.setState({ region });
  };

  onUserLocationChange = (event) => {
    let myCoordinate = event.nativeEvent.coordinate;

    if (
      myCoordinate.latitude.toFixed(10) ===
        this.state.myLocation.latitude.toFixed(10) &&
      myCoordinate.longitude.toFixed(10) ===
        this.state.myLocation.longitude.toFixed(10)
    ) {
      return;
    }

    this.setState(
      {
        myLocation: myCoordinate,
      }
      // this.moveCamera(myCoordinate.latitude, myCoordinate.longitude)
    );
  };

  render() {
    const { getPostsApi, mapView } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          followsUserLocation
          mapPadding={this.mapPadding}
          ref={mapView}
          style={this.mapStyle}
          region={this.state.region}
          onUserLocationChange={this.onUserLocationChange}
          // onMapReady={this.goToInitialLocation}
          onRegionChangeComplete={this.onRegionChangeComplete}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation
          zoomEnabled
        >
          {this.state.placeMarkerMode === true ? (
            <Marker
              draggable
              pinColor={"green"}
              coordinate={this.state.placeMarkerCoordinate}
              onDragEnd={(e) => {
                // console.log(e.nativeEvent.coordinate);
                this.setState({
                  placeMarkerCoordinate: e.nativeEvent.coordinate,
                });
              }}
            />
          ) : (
            this.state.tourFilteredList.map((marker) => (
              <Marker
                // draggable
                key={marker.id}
                pinColor={this.state.markersColor}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.description}
                description={marker.title}
                onPress={() => this.clickToMarker(marker)}
              />
            ))
          )}
        </MapView>
        <ActivityIndicator visible={getPostsApi.loading} />
        <View style={styles.overlay}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "limegreen" }]}
            onPress={this.showLockerPosts}
          >
            <MaterialCommunityIcons
              name="locker"
              color={colors.black}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "dodgerblue" }]}
            onPress={this.showMyPosts}
          >
            <MaterialCommunityIcons
              name="map-marker-multiple"
              color={colors.black}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "crimson" }]}
            onPress={this.searchMarkers}
          >
            <MaterialCommunityIcons
              name="map-marker-question"
              color={colors.black}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "limegreen", bottom: 100, position: "absolute" },
          ]}
          onPress={() => this.openBottomSheet(true)}
        >
          {this.state.placeMarkerMode ? (
            <Text>{"DONE"}</Text>
          ) : (
            <MaterialCommunityIcons
              name="map-marker-plus"
              color={colors.black}
              size={28}
            />
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            // styles.button,
            {
              alignItems: "center",
              backgroundColor: "limegreen",
              bottom: 100,
              height: 60,
              position: "absolute",
              right: 100,
            },
          ]}
          onPress={() => console.log("Posting")}
        >
          <Text
            style={{
              backgroundColor: "blue",
              flex: 1,
            }}
          >
            {"Post to this location"}
          </Text>
        </TouchableOpacity> */}
      </View>
      //  34.2709266,-118.5139665,3a,90y,9.06h,70.3t
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    aspectRatio: 1,
    // backgroundColor: "green",
    borderRadius: 30,
    justifyContent: "center",
    width: 60,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 25,
    // backgroundColor: "cornflowerblue",
    width: "100%",
  },
});

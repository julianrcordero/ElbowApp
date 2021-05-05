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
import postsApi from "../api/posts"; //"../api/posts";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    region: {
      latitude: 34.2709266,
      longitude: -118.5139665,
      latitudeDelta: 0.2,
      longitudeDelta: 0.0421,
    },
    initialMarkers: [],
    currentMarkers: "dodgerblue",
    progress: 0,
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.moveCamera(this.state.region.latitude, this.state.region.longitude);
  }

  async getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.2,
          longitudeDelta: 0.0421,
        };
        this.setState({
          region: region,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }

  moveCamera = (latitude, longitude, zoom) => {
    if (this.props._map.current) {
      console.log("moveCamera");
      this.props._map.current.animateCamera(
        {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          zoom: zoom,
        },
        2000
      );
    }
  };

  clickToMarker = (marker) => {
    // this.props.bottomSheetRef.current.snapTo(1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.moveCamera(marker.latitude, marker.longitude);
      });
    });
    () => interactionPromise.cancel();
    this.openBottomSheet(false);
  };

  openBottomSheet = (postMode) => {
    this.props.bottomSheetRef.current.snapTo(1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      this.props.setAddPostMode(postMode);
      setTimeout(() => {
        //     this.props.carousel.current.scrollToIndex({
        //       animated: false,
        //       index: marker.id,
        //     });
      });
    });
    () => interactionPromise.cancel();
  };

  showLockerPosts = async () => {
    const result = await postsApi.getLocker();

    if (!result.ok) {
      // setUploadVisible(false);
      console.log(result);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
      ]);
    } else {
      if (result.data.total === 0) {
        return Alert.alert("Sorry!", "You have not unlocked any posts yet", [
          { text: "OK", onPress: () => console.log("") },
        ]);
      }
      this.setMarkers(result); //this.props.searchPostsApi);
      this.setState({ currentMarkers: "limegreen" });
    }
  };

  showMyPosts = async () => {
    const result = await postsApi.getPosts();

    if (!result.ok) {
      // setUploadVisible(false);
      console.log(result);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
      ]);
    } else {
      this.setMarkers(result); //this.props.searchPostsApi);
      this.setState({ currentMarkers: "dodgerblue" });
    }
  };

  searchMarkers = async () => {
    const result = await postsApi.searchPosts(this.state.region, (progress) =>
      // setProgress(progress)
      this.setState({ progress: progress })
    );

    if (!result.ok) {
      console.log(result);
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
      ]);
    } else {
      this.setMarkers(result);
      this.setState({ currentMarkers: "crimson" });
    }
  };

  //  OLD ONE
  // showMyPosts = async () => {
  //   await this.props.getPostsApi.request();
  //   this.setMarkers(this.props.getPostsApi);
  //   this.setState({ currentMarkers: "dodgerblue" });
  // };

  // searchMarkers = async () => {
  //   await this.props.searchPostsApi.request();
  //   this.setMarkers(this.props.searchPostsApi);
  //   this.setState({ currentMarkers: "red" });
  // };

  setMarkers = (myApi) => {
    if (!myApi.error) {
      let initialMarkers = [];

      if (myApi.data.posts) {
        console.log(myApi.data.posts);
        myApi.data.posts.map(
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
              },
            ])
        );
      } else {
        console.log(myApi.data);
      }

      this.props.setMarkerList(initialMarkers);
    } else {
      console.log("getPostsApi.error: ", myApi.error);
    }
  };

  mapPadding = { bottom: 70 };
  mapStyle = { flex: 1 };

  onRegionChangeComplete = (region) => {
    this.setState({ region: region });
  };

  render() {
    const {
      bottomSheetRef,
      carousel,
      getPostsApi,
      _map,
      markerList,
      searchPostsApi,
    } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          followsUserLocation
          mapPadding={this.mapPadding}
          ref={_map}
          style={this.mapStyle}
          region={this.state.region}
          // onMapReady={this.goToInitialLocation}
          onRegionChangeComplete={this.onRegionChangeComplete}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation
          zoomEnabled
        >
          {markerList.map((marker) => (
            <Marker
              // draggable
              key={marker.id}
              pinColor={this.state.currentMarkers}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.description}
              description={marker.title}
              onPress={() => this.clickToMarker(marker)}
              // onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
            />
          ))}
        </MapView>
        <ActivityIndicator
          visible={getPostsApi.loading} // || searchPostsApi.loading}
        />
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
          <MaterialCommunityIcons
            name="map-marker-plus"
            color={colors.black}
            size={28}
          />
        </TouchableOpacity>
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

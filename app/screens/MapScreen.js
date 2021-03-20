import React from "react";
import { Component } from "react";
import {
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
    currentMarkers: "blue",
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
      this.props._map.current.animateCamera(
        {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          zoom: zoom,
        },
        5000
      );
    }
  };

  clickToMarker = (marker) => {
    this.props.bottomSheetRef.current.snapTo(1);

    this.moveCamera(marker.latitude, marker.longitude);

    this.openBottomSheet(false);
  };

  openBottomSheet = (postMode) => {
    this.props.bottomSheetRef.current.snapTo(1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = markerList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
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

  showMyMarkers = () => {
    this.props.getPostsApi.request();
    this.setMarkers(this.props.getPostsApi);
    this.setState({ currentMarkers: "blue" });
  };

  searchMarkers = () => {
    this.props.searchPostsApi.request();
    this.setMarkers(this.props.searchPostsApi);
    this.setState({ currentMarkers: "red" });
  };

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

  render() {
    const {
      bottomSheetRef,
      carousel,
      getPostsApi,
      _map,
      markerList,
    } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          followsUserLocation
          mapPadding={{ bottom: 70 }}
          ref={_map}
          style={{ flex: 1 }}
          region={this.state.region}
          // onMapReady={this.goToInitialLocation}
          onRegionChangeComplete={(region) => {
            this.setState({ region: region });
          }}
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
              title={marker.title}
              description={marker.description}
              onPress={() => this.clickToMarker(marker)}
              // onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
            />
          ))}
        </MapView>
        <ActivityIndicator visible={getPostsApi.loading} />
        <View style={styles.overlay}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => this.openBottomSheet(true)}
          >
            <MaterialCommunityIcons
              name="map-marker-plus"
              color={colors.black}
              size={28}
            />
            {/* <Text style={styles.text}>Add a marker</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={this.showMyMarkers}
          >
            <MaterialCommunityIcons
              name="map-marker-multiple"
              color={colors.black}
              size={28}
            />
            {/* <Text style={styles.text}>Show my markers</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={this.searchMarkers}
          >
            <MaterialCommunityIcons
              name="map-marker-question"
              color={colors.black}
              size={28}
            />
            {/* <Text style={styles.text}>Show my markers</Text> */}
          </TouchableOpacity>
        </View>
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
    bottom: 100,
    // backgroundColor: "cornflowerblue",
    width: "100%",
  },
});

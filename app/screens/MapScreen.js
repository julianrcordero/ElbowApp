import React, { useEffect, useRef, useState } from "react";
import { PureComponent } from "react";
import { render } from "react-dom";
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

export default class MapScreen extends PureComponent {
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
    initialMarkers: [
      {
        id: 0,
        latitude: 34.22122713684184,
        longitude: -118.42242144048214,
        title: "Grace Community Church Worship Center",
        description: "Where I first asked her out",
      },
      {
        id: 1,
        latitude: 34.2413,
        longitude: -119.265,
        title: "Ventura Harbor Village",
        description: "Where I almost drowned",
      },
      {
        id: 2,
        latitude: 34.0759,
        longitude: -118.441,
        title: "UCLA Broad Art Center",
        description: "Where we met",
      },
      {
        id: 3,
        latitude: 34.31,
        longitude: -118.5139665,
        title: "O'Melveny Field",
        description: "Where I proposed",
      },
    ],
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.getCurrentLocation();
    this.moveCamera(this.state.region.latitude, this.state.region.longitude);
    this.props.setMarkerList(this.state.initialMarkers);
  }

  async getCurrentLocation() {
    console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.2,
          longitudeDelta: 0.0421,
        };
        console.log("Initial region: ", region);
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

  // goToInitialLocation() {
  //   let initialRegion = Object.assign({}, this.state.initialRegion);
  //   initialRegion["latitudeDelta"] = 0.005;
  //   initialRegion["longitudeDelta"] = 0.005;
  //   this.mapView.animateToRegion(initialRegion, 2000);
  // }

  moveCamera = (latitude, longitude, zoom) => {
    console.log("moveCamera");
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
    console.log("clickToMarker");
    this.props.bottomSheetRef.current.snapTo(1);

    this.moveCamera(marker.latitude, marker.longitude);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = markerList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        this.props.carousel.current.scrollToIndex({
          animated: false,
          index: marker.id,
        });
      });
    });
    () => interactionPromise.cancel();
  };

  addMarker = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        };

        const newMarkerList = [
          ...this.props.markerList,
          {
            id: this.props.markerList.length,
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            title: "Location #" + (this.props.markerList.length + 1),
            description: "Where I dropped a pin",
          },
        ];
        this.props.setMarkerList(newMarkerList);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

  render() {
    const { bottomSheetRef, carousel, _map, markerList } = this.props;

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
              pinColor={colors.primary}
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
        <TouchableOpacity style={styles.overlay} onPress={this.addMarker}>
          <MaterialCommunityIcons
            name="map-marker-plus"
            color={colors.black}
            size={28}
          />
          {/* <Text style={styles.text}>Add a marker</Text> */}
        </TouchableOpacity>
      </View>
      //  34.2709266,-118.5139665,3a,90y,9.06h,70.3t
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    backgroundColor: "cornflowerblue",
    borderRadius: 30,
    width: 60,
  },
});

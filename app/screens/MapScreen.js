import React, { useEffect, useRef, useState } from "react";
import { InteractionManager, StyleSheet, View } from "react-native";

import MapView, {
  Animated,
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import colors from "../config/colors";

const MapScreen = ({
  bottomSheetRef,
  carousel,
  _map,
  verseList,
  setVerseList,
}) => {
  const markers = [
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
  ];

  const moveCamera = (latitude, longitude, zoom) => {
    if (_map.current) {
      _map.current.animateCamera(
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

  useEffect(() => {
    moveCamera(34.2709266, -118.5139665);

    setVerseList(markers);
  }, []);

  const [region, setRegion] = useState({
    latitude: 34.2709266,
    longitude: -118.5139665,
    latitudeDelta: 0.2,
    longitudeDelta: 0.0421,
  });

  const goToMarker = (marker) => {
    bottomSheetRef.current.snapTo(1);

    moveCamera(marker.latitude, marker.longitude);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = verseList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        carousel.current.scrollToIndex({ animated: false, index: marker.id });
      });
    });
    () => interactionPromise.cancel();
  };

  return (
    <MapView
      ref={_map}
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={(region) => {
        setRegion(region);
      }}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
    >
      {markers.map((marker) => (
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
          onPress={() => goToMarker(marker)}
          // onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
        />
      ))}
    </MapView>
    //  34.2709266,-118.5139665,3a,90y,9.06h,70.3t
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

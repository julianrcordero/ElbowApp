import React, { Component, useRef } from "react";
import { FlatList, View } from "react-native";
import PostCard from "./PostCard";

import { getBottomSpace } from "react-native-iphone-x-helper";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  slideToMarker = (item) => {
    if (_map.current) {
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

  onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      this.slideToMarker(viewableItems.viewableItems[0].item);
    }
    // Use viewable items in state or as intended
  });
  viewConfigRef = useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  });

  getItemLayout = (data, index) => ({
    length: this.props.width,
    offset: this.props.width * index,
    index,
  });

  keyExtractor = (item, index) => item.id;

  renderCarouselItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "white",
          // flex: 1,
          width: this.props.width,
          paddingHorizontal: 30,
        }}
      >
        <PostCard
          key={index}
          // currentBook={currentBook}
          item={item}
          crossrefSize={this.props.crossrefSize}
          fontSize={this.props.fontSize}
          height={
            this.props.top - this.props.bottomSheetHeaderHeight
            // - getBottomSpace()
          }
          bottomSheetRef={this.props.bottomSheetRef}
          markerList={this.props.markerList}
          setMarkerList={this.props.setMarkerList}
          verseCardReferenceHeight={this.props.verseCardReferenceHeight}
        />
      </View>
    );
  };

  render() {
    const { top, markerList, _map } = this.props;
    return (
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
            getItemLayout={this.getItemLayout}
            horizontal={true}
            initialNumToRender={5}
            keyExtractor={this.keyExtractor}
            // onScrollEndDrag={slideToMarker}
            ref={carousel}
            renderItem={this.renderCarouselItem}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"start"}
            snapToInterval={width}
            style={{ backgroundColor: "white" }}
            onViewableItemsChanged={this.onViewRef.current}
            viewabilityConfig={this.viewConfigRef.current}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 75,
            // }}
          />
        ) : null}
      </View>
    );
  }
}

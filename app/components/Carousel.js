import React, { Component, useRef } from "react";
import { FlatList, View } from "react-native";
import PostCard from "./PostCard";
import DropDownPicker from "react-native-dropdown-picker";

import { getBottomSpace } from "react-native-iphone-x-helper";
import PostContentScreen from "../screens/PostContentScreen";
import postsApi from "../api/posts";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadTours();
  }

  async loadTours() {
    const result = await postsApi.getTours();
    console.log(result.data.tours);

    const items = [];

    result.data.tours.forEach((tour) => {
      items.push({ label: tour.title, value: tour.title });
    });
    this.setState({ items: items });
  }

  state = {
    addPostMode: true,
    items: this.props.tourList,
    // [
    //   { label: "Apple", value: "apple" },
    //   { label: "Banana", value: "banana" },
    // ],
    open: false,
    value: null,
  };

  slideToMarker = (item) => {
    if (this.props.mapView.current) {
      this.props.mapView.current.animateCamera(
        {
          center: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          zoom: 12,
        },
        { duration: 500 }
      );
    }
  };

  onViewRef = (viewableItems) => {
    const firstViewableIndex = viewableItems.viewableItems[0];
    if (firstViewableIndex) {
      this.slideToMarker(firstViewableIndex.item);
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 90,
  };

  getItemLayout = (data, index) => ({
    length: this.props.width,
    offset: this.props.width * index,
    index,
  });

  keyExtractor = (item, index) => item.id;

  renderCarouselItem = ({ item, index }) => {
    return (
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
        map={this.props.map}
        verseCardReferenceHeight={this.props.verseCardReferenceHeight}
        width={this.props.width}
      />
    );
  };

  setValue = (value) => this.setState({ value: value });

  setItems = (items) => {
    this.setState({ items: items });
  };

  setOpen = (open) => this.setState({ open: open });

  render() {
    const {
      bottomSheetRef,
      carousel,
      map,
      mapView,
      top,
      tourList,
      width,
    } = this.props;

    return this.state.addPostMode ? (
      <View style={{ backgroundColor: "white", width: width }}>
        <PostContentScreen
          bottomSheetRef={bottomSheetRef}
          map={map}
          tourList={tourList}
        />
      </View>
    ) : (
      <View
        style={{
          backgroundColor: "white",
          height: top - 50,
        }}
      >
        <DropDownPicker
          containerStyle={{ marginVertical: 15, paddingHorizontal: 30 }}
          dropDownContainerStyle={{ paddingHorizontal: 30 }}
          dropDownDirection={"BOTTOM"}
          open={this.state.open}
          value={this.state.value}
          items={this.state.items}
          setValue={this.setValue}
          setItems={this.setItems}
          setOpen={this.setOpen}
          searchable={false}
          placeholder={"Filter by..."}
        />

        {mapView.current ? (
          <FlatList
            bounces={false}
            data={map.current.state.markerList}
            decelerationRate={"fast"}
            extraData={mapView.current.state.markers}
            getItemLayout={this.getItemLayout}
            horizontal={true}
            initialNumToRender={5}
            keyExtractor={this.keyExtractor}
            // onScrollEndDrag={this.slideToMarker}
            pagingEnabled={true}
            ref={carousel}
            renderItem={this.renderCarouselItem}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"start"}
            snapToInterval={width}
            style={{ backgroundColor: "white" }}
            onViewableItemsChanged={this.onViewRef}
            viewabilityConfig={this.viewConfigRef}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 75,
            // }}
          />
        ) : null}
      </View>
    );
  }
}

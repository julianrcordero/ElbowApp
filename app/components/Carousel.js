import React, { Component, useRef } from "react";
import { FlatList, View } from "react-native";
import CarouselCard from "./CarouselCard";
// import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

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
    const tours = await postsApi.getTours();
    const locker = await postsApi.getLocker();
    this.setState({ tours: tours.data.tours, locker: locker.data.posts });
    // console.log("tours:", this.state.tours);
  }

  async loadTour(tourID) {
    console.log(tourID);

    if (tourID !== 0) {
    } else {
    }

    const result =
      tourID === 0
        ? await postsApi.getLocker()
        : await postsApi.getTourPoints(tourID, (progress) =>
            // setProgress(progress)
            this.setState({ progress: progress })
          );

    const myMap = this.props.map.current;

    if (myMap) {
      if (!result.ok) {
      } else {
        myMap.setMarkers(result);
      }

      // myMap.setState({
      //   tourFilteredList: tourID
      //     ? //tour.data.posts
      //       myMap.state.markerList.filter(
      //         (marker) =>
      //           marker.tourID === tourID &&
      //           !this.state.locker.some(
      //             (lockerPost) => lockerPost.id === marker.id
      //           )
      //       )
      //     : myMap.state.markerList,
      // });
    }
  }

  state = {
    addPostMode: true,
    locker: [],
    progress: 0,
    tour: null,
    tours: this.props.tourList,
    filter: 0,
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
      <CarouselCard
        carousel={this.props.carousel}
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

  onValueChange = (itemValue, itemPosition) => {
    console.log("changed to", itemValue);
    this.setState({ filter: itemValue });
    // this.setState({
    //   tours: this.state.tours.filter((item) => item.tourID === itemValue),
    // });

    this.loadTour(itemValue);
  };

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
        <Picker
          selectedValue={this.state.filter}
          onValueChange={this.onValueChange}
          style={{
            // alignItems: "center",
            backgroundColor: "green",
            height: 60,
            justifyContent: "center",
            paddingHorizontal: 30,
          }}
        >
          <Picker.Item key={"key"} label={"All posts"} value={0} />
          {this.state.tours.map((item) => (
            <Picker.Item key={item.id} label={item.title} value={item.ID} />
          ))}
        </Picker>

        {mapView.current ? (
          <FlatList
            bounces={false}
            data={map.current.state.tourFilteredList}
            decelerationRate={"fast"}
            extraData={map.current}
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

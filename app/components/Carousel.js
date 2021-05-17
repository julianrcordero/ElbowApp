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
    this.getCurrentLocation();
    this.loadTours();
  }

  async loadTours() {
    const subscribedTours = await postsApi.getSubscribedTours();
    const createdTours = await postsApi.getCreatedTours();
    const locker = await postsApi.getLocker();
    this.setState({
      createdTours: createdTours.data.tours,
      subscribedTours: subscribedTours.data.tours,
      locker: locker.data.posts,
    });
  }

  async loadTour(tourID) {
    const myMap = this.props.map.current;

    if (myMap) {
      myMap.setState({
        tourFilteredList:
          tourID === 0
            ? myMap.state.markerList
            : myMap.state.markerList.filter(
                (marker) => marker.tourID === tourID
              ),
      });
    }
  }

  async getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let location = {
          lat: parseFloat(position.coords.latitude),
          lon: parseFloat(position.coords.longitude),
        };
        this.setState({
          location: location,
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

  state = {
    addPostMode: true,
    createdTours: [],
    location: {
      latitude: 34.2709266,
      longitude: -118.5139665,
    },
    locker: [],
    progress: 0,
    tour: null,
    subscribedTours: [], //this.props.tourList,
    filter: 0,
  };

  slideToMarker = (item) => {
    if (this.props.mapView.current) {
      this.props.mapView.current?.animateCamera(
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
        crossrefSize={this.props.crossrefSize}
        description={item.description}
        fontSize={this.props.fontSize}
        height={
          this.props.top - this.props.bottomSheetHeaderHeight
          // - getBottomSpace()
        }
        id={item.id}
        bottomSheetRef={this.props.bottomSheetRef}
        location={this.state.location}
        map={this.props.map}
        title={item.title}
        url={item.url}
        userID={item.userID}
        verseCardReferenceHeight={this.props.verseCardReferenceHeight}
        width={this.props.width}
      />
    );
  };

  onValueChange = (itemValue, itemPosition) => {
    // console.log("changed to", itemValue);
    this.setState({ filter: itemValue });
    // this.setState({
    //   subscribedTours: this.state.tours.filter((item) => item.tourID === itemValue),
    // });

    this.loadTour(itemValue);
  };

  render() {
    const { bottomSheetRef, carousel, map, mapView, top, tourList, width } =
      this.props;

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
          {this.state.subscribedTours.map((item) => (
            <Picker.Item key={item.id} label={item.title} value={item.ID} />
          ))}
        </Picker>

        {mapView.current ? (
          <FlatList
            bounces={false}
            data={map.current?.state.tourFilteredList}
            decelerationRate={"fast"}
            extraData={this.state.filter}
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

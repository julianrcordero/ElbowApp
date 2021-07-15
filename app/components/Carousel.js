import React, { Component, useRef } from "react";
import { Dimensions, FlatList, View } from "react-native";
import CarouselCard from "./CarouselCard";
// import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

import AppText from "../components/Text";
import { getBottomSpace } from "react-native-iphone-x-helper";
import PostContentScreen from "../screens/PostContentScreen";
import postsApi from "../api/posts";
const { height, width } = Dimensions.get("window");

import { Auth } from "aws-amplify";

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPostMode: false,
      createdTours: [],
      data: props.map.current?.state.tourFilteredList,
      locker: [],
      progress: 0,
      tour: null,
      subscribedTours: [],
      filter: 0,
    };
  }

  componentDidMount() {
    this.loadTours();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      console.log("data updated:", this.state.data.length);
    }
  }

  async loadTours() {
    const subscribedTours = await postsApi.getSubscribedTours();
    const createdTours = await postsApi.getCreatedTours();

    const locker = await postsApi.getLocker();
    this.setState({
      createdTours: createdTours.data.tours ?? [],
      subscribedTours: subscribedTours.data.tours ?? [],
      locker: locker.data.posts ?? [],
    });
  }

  async loadTour(tourID) {
    const myMap = this.props.map.current;

    myMap?.setState({
      tourFilteredList:
        tourID === 0
          ? myMap.state.markerList
          : myMap.state.markerList.filter((marker) => marker.tourID === tourID),
    });
  }

  slideToMarker = (item) => {
    this.props.map.current?.moveCamera(item.latitude, item.longitude);
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
    length: width,
    offset: width * index,
    index,
  });

  keyExtractor = (item, index) => (item.id ? item.id : item.ID);

  renderCarouselItem = ({ item, index }) => {
    return (
      <CarouselCard
        carousel={this.props.carousel}
        key={this.keyExtractor}
        crossrefSize={this.props.crossrefSize}
        description={item.description}
        fontSize={this.props.fontSize}
        height={
          this.props.top - this.props.bottomSheetHeaderHeight
          // - getBottomSpace()
        }
        id={item.id}
        bottomSheetRef={this.props.bottomSheetRef}
        loadTours={this.loadTours}
        map={this.props.map}
        subscribedTours={this.state.subscribedTours}
        title={item.title}
        tourID={item.tourID}
        url={item.url}
        user={this.props.user}
        userID={item.userID}
        verseCardReferenceHeight={this.props.verseCardReferenceHeight}
        width={width}
      />
    );
  };

  onValueChange = (itemValue, itemPosition) => {
    this.setState({ filter: itemValue });
    // this.setState({
    //   subscribedTours: this.state.tours.filter((item) => item.tourID === itemValue),
    // });

    this.loadTour(itemValue);
  };

  render() {
    const { bottomSheetRef, carousel, map, mapView, top, width } = this.props;

    return this.state.addPostMode ? (
      <View style={{ backgroundColor: "white", height: "100%", width: width }}>
        <PostContentScreen bottomSheetRef={bottomSheetRef} map={map} />
      </View>
    ) : (
      <View
        style={{
          backgroundColor: "white",
          height: top - 50,
        }}
      >
        {this.state.subscribedTours.length > 0 && (
          <View
            style={{
              alignItems: "center",
              borderWidth: 0.5,
              flexDirection: "row",
              height: 60,
              justifyContent: "center",
            }}
          >
            <AppText
              style={{
                fontSize: 25,
                fontWeight: "bold",
                // marginVertical: 15,
                textAlign: "center",
                // width: "100%",
              }}
            >
              {"Tour:\t"}
            </AppText>
            <Picker
              selectedValue={this.state.filter}
              onValueChange={this.onValueChange}
              style={{
                // alignSelf: "center",
                // backgroundColor: "green",
                height: "100%",
                justifyContent: "center",
                // paddingHorizontal: 30,
                width: "50%",
              }}
            >
              <Picker.Item key={"key"} label={"All posts"} value={0} />
              {this.state.subscribedTours.map((item) => (
                <Picker.Item key={item.ID} label={item.title} value={item.ID} />
              ))}
            </Picker>
          </View>
        )}

        {mapView.current ? (
          <FlatList
            bounces={false}
            data={this.state.data}
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
            // style={{ backgroundColor: "yellow" }}
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

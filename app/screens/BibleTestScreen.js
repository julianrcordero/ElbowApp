// import React, { useState, Component, setState, PureComponent } from "react";
// import {
//   FlatList,
//   Image,
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   SectionList,
//   VirtualizedList,
// } from "react-native";
// import {
//   Collapse,
//   CollapseHeader,
//   CollapseBody,
//   AccordionList,
// } from "accordion-collapse-react-native";
// import Highlighter from "react-native-highlight-words";

// import { useDeviceOrientation } from "@react-native-community/hooks";

// // import * as IJohn from "../json/bible/I John.json";
// import * as Bible from "../json/bible/Bible";
// import VerseBox from "../components/VerseBox";
// import defaultStyles from "../config/styles";
// import colors from "../config/colors";

// import BiblePicker from "../components/BiblePicker";
// import CategoryPickerItem from "../components/CategoryPickerItem";
// import AppText from "../components/Text";
// import VerseBody from "../components/VerseBody";

// class SelectableItem extends React.Component {
//   constructor() {
//     super();

//     this.handleOnPress = this.handleOnPress.bind(this);
//   }

//   shouldComponentUpdate(nextProps) {
//     const { isSelected } = this.props;
//     return isSelected !== nextProps.isSelected;
//   }

//   handleOnPress() {
//     const { onPress } = this.props;
//     onPress();
//   }

//   render() {
//     const { isSelected, text } = this.props;
//     const textColor = isSelected ? "blue" : "black";

//     return (
//       <TouchableOpacity onPress={this.handleOnPress}>
//         <View>
//           <Text style={{ color: textColor }}>{text}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

// class BibleTestScreen extends React.Component {
//   constructor() {
//     super();

//     this.handleOnPressItem = this.handleOnPressItem.bind(this);
//     this.state = {
//       selected: new Map(),
//     };
//   }

//   onPressItem(id) {
//     this.setState((state) => {
//       const selected = new Map(state.selected);
//       selected.set(id, !selected.get(id));
//       return { selected };
//     });
//   }

//   renderItem({ item }) {
//     const { selected } = this.state;

//     return (
//       <SelectableItem
//         id={item.id}
//         onPressItem={this.handleOnPressItem}
//         selected={!!selected.get(item.id)}
//         title={item.title}
//       />
//     );
//   }

//   handleOnPressItem() {
//     return console.log("handleOnPressItem");
//   }

//   render() {
//     // const { data } = this.props;
//     const data = [
//       {
//         id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//         title: "First Item",
//       },
//       {
//         id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//         title: "Second Item",
//       },
//       {
//         id: "58694a0f-3da1-471f-bd96-145571e29d72",
//         title: "Third Item",
//       },
//     ];

//     return (
//       <FlatList
//         data={data}
//         extraData={this.state}
//         keyExtractor={(item) => item.id}
//         renderItem={this.renderItem}
//       />
//     );
//   }
// }

// export default BibleTestScreen;

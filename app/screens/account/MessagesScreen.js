import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../../components/lists/BibleListItem";
import ListItemSeparator from "../../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../../components/lists/ListItemDeleteAction";

const initialMessages = [
  {
    id: 1,
    title: "The Constitution of the United States",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    image: require("../../assets/macarthurProfile.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../../assets/macarthurProfile.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setFreshing] = useState(false);

  const handleDelete = (message) => {
    //Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../../assets/macarthurProfile.jpg"),
            },
          ]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagesScreen;

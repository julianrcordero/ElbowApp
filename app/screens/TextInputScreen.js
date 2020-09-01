import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

function TextInputScreen(props) {
  const [firstName, setFirstName] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <Text>{firstName}</Text>
      <TextInput
        secureTextEntry={true}
        // clearButtonMode="always"
        // maxLength
        // keyboardType="numeric"
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
}

export default TextInputScreen;

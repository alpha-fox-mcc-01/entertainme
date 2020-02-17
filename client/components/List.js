import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground
} from "react-native";

export default function List({ route, navigation }) {
  const { items } = route.params;
  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg"
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => {
          <Text>{JSON.stringify(item)}</Text>;
        }}
      ></FlatList>
    </ImageBackground>
  );
}

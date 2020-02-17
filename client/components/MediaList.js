import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image
} from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";

export default function MediaList({ route, navigation }) {
  const { items } = route.params;
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/Montserrat-Regular.ttf")
    });
    setFontLoaded(true);
  };

  const setColor = popularity => {
    if (popularity > 8.5) {
      return "lightgreen";
    } else if (popularity > 6.5) {
      return "orange";
    } else {
      return "tomato";
    }
  };

  useEffect(() => {
    loadFont();
  }, []);
  return (
    fontLoaded && (
      <ImageBackground
        source={{
          uri:
            "https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg"
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{ marginTop: Constants.statusBarHeight, alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "tomato",
              fontFamily: "Montserrat-Regular"
            }}
          >
            Your Media
          </Text>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: 200 }}
              onPress={() => {
                if (route.name === "List Movies") {
                  navigation.push("Edit Movie", {
                    query: "GET_MOVIES",
                    mutation: "EDIT_MOVIE",
                    resource: "movies",
                    mutationName: "editMovie",
                    deleteMutation: "DELETE_MOVIE",
                    deleteMutationName: "deleteMovie",
                    action: "View/Edit Movie",
                    document: item,
                    listName: "List Movies"
                  });
                } else {
                  navigation.push("Edit TvSeries", {
                    query: "GET_TV_SERIES",
                    mutation: "EDIT_TV_SERIES",
                    resource: "tvSeries",
                    mutationName: "editTvSeries",
                    deleteMutation: "DELETE_TV_SERIES",
                    deleteMutationName: "deleteTvSeries",
                    action: "View/Edit TV Series",
                    document: item,
                    listName: "List TvSeries"
                  });
                }
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -15,
                  zIndex: 2,
                  left: 51,
                  backgroundColor: setColor(item.popularity),
                  padding: 3,
                  borderRadius: 10,
                  width: 50,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ color: "white", fontFamily: "Montserrat-Regular" }}
                >
                  {item.popularity}
                </Text>
              </View>
              <Image
                source={{ uri: item.poster_path }}
                style={{ width: 150, height: 200 }}
              ></Image>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 13,
                  fontFamily: "Montserrat-Regular"
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "white",
                  opacity: 0.5,
                  marginBottom: 25,
                  fontFamily: "Montserrat-Regular"
                }}
              >
                {item.tags.join(",")}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          numColumns={2}
          style={{ marginLeft: 30, marginTop: 35 }}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      </ImageBackground>
    )
  );
}

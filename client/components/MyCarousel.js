import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Carousel from "react-native-snap-carousel";
import * as Progress from "react-native-progress";
import * as Font from "expo-font";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default function MyCarousel(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/Montserrat-Regular.ttf")
    });
    setFontLoaded(true);
  };
  useEffect(() => {
    loadFont();
  }, []);

  const {
    entries,
    navigation,
    query,
    screenToGo,
    mutation,
    resource,
    mutationName,
    deleteMutation,
    deleteMutationName,
    action
  } = props;
  const _renderItem = ({ item, index }) => {
    return (
      <>
        <View style={{ height: 720 }}>
          <Image
            source={{ uri: item.poster_path }}
            style={{
              width: "65%",
              height: "53%",
              alignSelf: "center",
              marginTop: 75,
              borderRadius: 15
            }}
          />
          <View style={styles.information}>
            <TouchableOpacity
              onPress={() =>
                navigation.push("Edit Movie", {
                  query: "GET_MOVIES",
                  mutation: "EDIT_MOVIE",
                  resource: "movies",
                  mutationName: "editMovie",
                  deleteMutation: "DELETE_MOVIE",
                  deleteMutationName: "deleteMovie",
                  action: "View/Edit Movie",
                  document: item
                })
              }
            >
              <Text style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}>
                {item.title.slice(0, 20)}
                {item.title.length >= 20 && <Text>...</Text>}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text
                  style={{ color: "grey", fontFamily: "Montserrat-Regular" }}
                >
                  Popularity: &nbsp;
                </Text>
                <Progress.Bar
                  progress={item.popularity / 10}
                  height={20}
                  animationType="spring"
                  animated={true}
                  color="grey"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  justifyContent: "space-around",
                  width: 250
                }}
              >
                {item.tags.slice(0, 2).map(tag => (
                  <View
                    key={Math.random()}
                    style={{
                      height: 25,
                      width: 100,
                      borderRadius: 13,
                      backgroundColor: "#b8d5cd",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontFamily: "Montserrat-Regular" }}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
            <ScrollView
              style={{
                marginTop: 10,
                height: 80,
                width: 270,
                marginTop: 20,
                marginLeft: "auto",
                textAlign: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-Regular"
                }}
              >
                {item.overview}
              </Text>
            </ScrollView>
          </View>
        </View>
      </>
    );
  };

  return (
    fontLoaded && (
      <>
        <Carousel
          data={entries}
          renderItem={_renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          containerCustomStyle={{ position: "absolute", zIndex: 2 }}
        />
      </>
    )
  );
}

const styles = StyleSheet.create({
  information: {
    alignItems: "center",
    marginTop: 10,
    width: "70%",
    textAlign: "center",
    alignSelf: "center"
  }
});

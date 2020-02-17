import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

import { useQuery, useMutation } from "@apollo/react-hooks";

import AddForm from "../components/AddForm";
import EditForm from "../components/EditForm";

import { GET_MOVIES, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE } from "../queries/";
import MyCarousel from "../components/MyCarousel";

export default function Movies() {
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
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

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
          style={{
            flexDirection: "row",
            marginTop: Constants.statusBarHeight,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 23,
              color: "tomato",
              fontFamily: "Montserrat-Regular"
            }}
          >
            EntertainMe
          </Text>
        </View>
        <MyCarousel entries={data.movies} />
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 15,
            alignSelf: "center",
            marginTop: 285,
            width: 320,
            height: 400
          }}
        ></View>
        <View
          style={{
            marginTop: "auto",
            flexDirection: "row",
            justifyContent: "space-around",
            width: 320,
            alignSelf: "center"
          }}
        >
          <AddForm
            ADD_QUERY={ADD_MOVIE}
            GET_QUERY={GET_MOVIES}
            resource="movies"
            mutationName="addMovie"
            action="Add New Movie"
          />
          <EditForm
            EDIT_QUERY={EDIT_MOVIE}
            GET_QUERY={GET_MOVIES}
            DELETE_QUERY={DELETE_MOVIE}
            resource="movies"
            mutationName="addMovie"
            action="Edit Movie"
          />
        </View>
      </ImageBackground>
    )
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  information: {
    marginTop: 200,
    alignItems: "center"
  }
});

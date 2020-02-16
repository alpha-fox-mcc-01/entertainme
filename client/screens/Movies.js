import React, { useState } from "react";
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
import MyCarousel from "../components/MyCarousel";
import { GET_MOVIES, ADD_MOVIE } from "../queries/";

export default function Movies() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    // <View style={styles.container}>
    //   <Text>This is Movies Page</Text>
    //   <Text
    //     style={{
    //       marginTop: 10
    //     }}
    //   >
    //     Add New Movie
    //   </Text>
    //   <AddForm
    //     ADD_QUERY={ADD_MOVIE}
    //     GET_QUERY={GET_MOVIES}
    //     resource="movies"
    //     mutationName="addMovie"
    //   />
    //   <Text>List of Movies:</Text>
    //   <View>
    //     {data.movies.map(movie => (
    //       <Text key={movie._id}>&bull;&nbsp;{movie.title}</Text>
    //     ))}
    //   </View>
    //https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg
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
          marginTop: 280,
          width: 320,
          height: 400
        }}
      ></View>
      <View style={{ marginTop: "auto" }}>
        <AddForm
          ADD_QUERY={ADD_MOVIE}
          GET_QUERY={GET_MOVIES}
          resource="movies"
          mutationName="addMovie"
        />
      </View>
    </ImageBackground>
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

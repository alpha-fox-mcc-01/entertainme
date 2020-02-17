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
import { createStackNavigator } from "@react-navigation/stack";

import Constants from "expo-constants";

import { useQuery, useMutation } from "@apollo/react-hooks";
import * as Progress from "react-native-progress";

import AddForm from "../components/AddForm";
import EditForm from "../components/EditForm";

import queries from "../queries/";
const { GET_MOVIES } = queries;
import MyCarousel from "../components/MyCarousel";

import MediaList from "../components/MediaList";

function HomeMovies({ navigation }) {
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

  if (loading)
    return <Progress.Bar width={200} indeterminate={true} color="tomato" />;
  if (error)
    return (
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          textSize: 20
        }}
      >
        Sorry, something went wrong
      </Text>
    );
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
        <MyCarousel
          entries={data.movies}
          navigation={navigation}
          screenToGo="Edit Movie"
        />
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
            width: 330,
            alignSelf: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.push("Add Movie", {
                query: "GET_MOVIES",
                mutation: "ADD_MOVIE",
                resource: "movies",
                mutationName: "addMovie",
                action: "Add New Movie"
              })
            }
            style={{
              marginTop: "auto",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 10,
              borderWidth: 3,
              borderColor: "tomato",
              borderRadius: 15,
              width: 160,
              height: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons name="ios-add" color="tomato" size={50} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push("List Movies", { items: data.movies })
            }
            style={{
              marginTop: "auto",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 10,
              borderWidth: 3,
              borderColor: "tomato",
              borderRadius: 15,
              width: 160,
              height: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons name="ios-albums" color="tomato" size={30} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  );
}

export default function Movies() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeMovies} />
      <Stack.Screen name="Add Movie" component={AddForm} />
      <Stack.Screen name="Edit Movie" component={EditForm} />
      <Stack.Screen name="List Movies" component={MediaList} />
    </Stack.Navigator>
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

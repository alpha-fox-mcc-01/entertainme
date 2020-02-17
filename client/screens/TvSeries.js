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

import AddForm from "../components/AddForm";
import EditForm from "../components/EditForm";

import queries from "../queries/";
import MyCarousel from "../components/MyCarousel";
const { GET_TV_SERIES } = queries;

function HomeTvSeries({ navigation }) {
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
  const { loading, error, data } = useQuery(GET_TV_SERIES);

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
        <MyCarousel
          entries={data.tvSeries}
          navigation={navigation}
          screenToGo="Edit TvSeries"
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
              navigation.push("Add TvSeries", {
                query: "GET_TV_SERIES",
                mutation: "ADD_TV_SERIES",
                resource: "tvSeries",
                mutationName: "addTvSeries",
                action: "Add New TV Series"
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
            onPress={() => setModalVisible(true)}
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

export default function TvSeries() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeTvSeries} />
      <Stack.Screen name="Add TvSeries" component={AddForm} />
      <Stack.Screen name="Edit TvSeries" component={EditForm} />
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

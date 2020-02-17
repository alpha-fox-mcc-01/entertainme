import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SlideMovies from "./SlideMovies";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import SlideSeries from "./SlideSeries";
import ListMovies from "./ListMovies";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListSeries from "./ListSeries"
import DrawerNav from "./DrawerNav"

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

const GET_SERIES = gql`
  {
    tvseries {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $popularity: Float
    $tags: [String]
    $poster_path: String
    $overview: String
  ) {
    addMovies(
      title: $title
      popularity: $popularity
      tags: $tags
      poster_path: $poster_path
      overview: $overview
    ) {
      _id
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading: loadSerial, error: errorSerial, data: serial } = useQuery(
    GET_SERIES
  );


  if (loading) return <Text>Loading Movies...</Text>;
  if (loadSerial) return <Text>Loading Series...</Text>;
  if (error) return <Text>Error movies...</Text>;
  if (errorSerial) return <Text>Error series...</Text>;
 
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        leftComponent={{ icon: "menu", color: "#fff" }}
        placement="left"
        centerComponent={{ text: "NERDFLIX", style: { color: "red" } }}
        containerStyle={{
          backgroundColor: "black"
        }}
      />
      <ScrollView style={styles.container}>
        <View style={{ height: 200, borderRadius: 6, marginBottom: 20 }}>
          <WebView
            style={styles.WebViewContainer}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: "https://www.youtube.com/embed/TcPk2p0Zaw4" }}
          />
        </View>
        <Text style={styles.fontStyle}>Trending Movies</Text>
        <SlideMovies movies={data.movies} />
        <Text style={styles.fontStyle}>Latest TV Series</Text>
        <SlideSeries tvseries={serial.tvseries} />
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: "black" },
            activeTintColor: "red",
          }}
        >
          <Tab.Screen name="All Movies" component={ListMovies} />
          <Tab.Screen name="All TV Series" component={ListSeries} />
        </Tab.Navigator>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  fontStyle: {
    color: "white"
  },
  WebViewContainer: {
    marginTop: 0,
    borderRadius: 6,
  }
});

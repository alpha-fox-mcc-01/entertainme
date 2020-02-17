import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";

import SlideMovies from "./components/SlideMovies";
import SlideSeries from './components/SlideSeries';
import { GET_SERIES, GET_MOVIES }  from "../../../Queries"


export default function Index({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading: loadSerial, error: errorSerial, data: serial } = useQuery(
    GET_SERIES
  );
  if (loading) return <Text>Loading Movies...</Text>;
  if (loadSerial) return <Text>Loading Series...</Text>;
  if (error) return <Text>Error movies...</Text>;
  if (errorSerial) return <Text>Error series...</Text>;
  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        leftComponent={
          <Icon
            style={{ color: "white" }}
            name="menu"
            onPress={() => navigation.openDrawer()}
          />
        }
        placement="left"
        centerComponent={{ text: "entertainMe", style: { color: "red" } }}
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
    borderRadius: 6
  }
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";

import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";

import { useMutation } from "@apollo/react-hooks";

import queries from "../queries/";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default function AddForm({ route, navigation }) {
  const { resource, mutationName, action, query, mutation } = route.params;

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPosterPath] = useState("");
  const [popularity, setPopularity] = useState("");
  const [tags, setTags] = useState([]);

  const [addNew, { loading, error, data }] = useMutation(queries[mutation], {
    update(cache, { data }) {
      const currentMovies = cache.readQuery({ query: queries[query] })[
        resource
      ];
      cache.writeQuery({
        query: queries[query],
        data: { [resource]: [data[mutationName], ...currentMovies] }
      });
    }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <KeyboardAvoidingView enabled>
      <ScrollView>
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg"
          }}
          style={{
            alignItems: "center",
            height: viewportHeight - 49.5,
            width: "100%"
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: 30,
              color: "tomato",
              marginTop: Constants.statusBarHeight
            }}
          >
            {action}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Ionicons
              name="ios-clipboard"
              color="tomato"
              size={30}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <TextInput
              placeholder="Title..."
              style={styles.inputField}
              onChangeText={text => setTitle(text)}
              value={title}
            />

            <Ionicons
              name="ios-chatbubbles"
              color="tomato"
              size={30}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <TextInput
              placeholder="Overview..."
              style={styles.inputField}
              onChangeText={text => setOverview(text)}
              value={overview}
            />

            <Ionicons
              name="ios-image"
              color="tomato"
              size={30}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <TextInput
              placeholder="Poster Path/URL..."
              style={styles.inputField}
              onChangeText={text => setPosterPath(text)}
              value={poster_path}
            />

            <Ionicons
              name="ios-people"
              color="tomato"
              size={30}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <TextInput
              placeholder="Popularity Scale..."
              style={styles.inputField}
              onChangeText={text => setPopularity(text)}
              value={popularity}
            />

            <Ionicons
              name="ios-apps"
              color="tomato"
              size={30}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <TextInput
              placeholder="Tags..."
              style={styles.inputField}
              onChangeText={text => setTags(text.split(","))}
              value={tags.join(",")}
            />

            <TouchableOpacity
              style={{
                borderWidth: 3,
                marginTop: 40,
                padding: 3,
                alignSelf: "center",
                width: 200,
                height: 37,
                borderRadius: 10,
                borderColor: "lightgreen",
                justifyContent: "center"
              }}
              onPress={() => {
                addNew({
                  variables: {
                    title,
                    overview,
                    poster_path,
                    popularity: parseFloat(popularity),
                    tags
                  }
                });
                setTitle("");
                setOverview("");
                setPosterPath("");
                setPopularity("");
                setTags([]);
                navigation.navigate("Home");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat-Regular",
                    fontSize: 20,
                    color: "lightgreen"
                  }}
                >
                  Submit
                </Text>
                <Ionicons
                  name="ios-checkmark"
                  color="lightgreen"
                  size={33}
                  style={{ marginRight: 10 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                marginTop: 15,
                padding: 3,
                alignSelf: "center",
                width: 200,
                height: 37,
                borderRadius: 10,
                borderColor: "white",
                justifyContent: "center"
              }}
              onPress={() => {
                setTitle("");
                setOverview("");
                setPosterPath("");
                setPopularity("");
                setTags([]);
                navigation.goBack();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat-Regular",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  Cancel
                </Text>
                <Ionicons
                  name="ios-close"
                  color="white"
                  size={33}
                  style={{ marginRight: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderColor: "tomato",
    borderWidth: 1,
    height: 35,
    width: 300,
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    color: "tomato",
    fontFamily: "Montserrat-Regular"
  }
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ImageBackground
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { KeyboardAvoidingView } from "react-native";

import { useMutation } from "@apollo/react-hooks";

export default function AddMovieForm(props) {
  const { EDIT_QUERY, GET_QUERY, DELETE_QUERY, resource, mutationName } = props;

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPosterPath] = useState("");
  const [popularity, setPopularity] = useState("");
  const [tags, setTags] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [editNew, { loading, error, data }] = useMutation(EDIT_QUERY, {
    update(cache, { data }) {
      const currentMovies = cache.readQuery({ query: GET_QUERY })[resource];
      cache.writeQuery({
        query: GET_QUERY,
        data: { [resource]: [data[mutationName], ...currentMovies] }
      });
    }
  });

  const [deleteNew] = useMutation(DELETE_QUERY, {
    update(cache, { data }) {
      const currentMovies = cache.readQuery({ query: GET_QUERY })[resource];
      cache.writeQuery({
        query: GET_QUERY,
        data: { [resource]: [data[mutationName], ...currentMovies] }
      });
    }
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
      behavior={"height"}
      enabled
    >
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg"
          }}
          style={{ alignItems: "center", height: "100%", width: "100%" }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: 30,
              color: "tomato"
            }}
          >
            {props.action}
          </Text>
          <View>
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
                editNew({
                  variables: {
                    title,
                    overview,
                    poster_path,
                    popularity: parseFloat(popularity),
                    tags
                  }
                });
                setModalVisible(false);
                setTitle("");
                setOverview("");
                setPosterPath("");
                setPopularity("");
                setTags([]);
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
                  Update
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
                setModalVisible(false);
                setTitle("");
                setOverview("");
                setPosterPath("");
                setPopularity("");
                setTags([]);
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
          <TouchableOpacity
            style={{
              borderWidth: 3,
              marginTop: 28,
              padding: 3,
              alignSelf: "center",
              width: 200,
              height: 37,
              borderRadius: 10,
              borderColor: "grey",
              justifyContent: "center"
            }}
            onPress={() => {
              deleteNew({});
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
                  color: "grey"
                }}
              >
                Delete
              </Text>
              <Ionicons
                name="ios-trash"
                color="grey"
                size={30}
                style={{ marginRight: 10 }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>

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
          width: 140,
          height: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Ionicons name="ios-settings" color="tomato" size={40} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderColor: "tomato",
    borderWidth: 1,
    height: 35,
    width: 300,
    marginTop: 20,
    padding: 5,
    borderRadius: 10,
    color: "tomato",
    fontFamily: "Montserrat-Regular"
  }
});

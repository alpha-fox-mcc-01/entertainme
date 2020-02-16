import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useMutation } from "@apollo/react-hooks";

export default function AddMovieForm(props) {
  const { ADD_QUERY, GET_QUERY, resource, mutationName } = props;

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPosterPath] = useState("");
  const [popularity, setPopularity] = useState("");
  const [tags, setTags] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [addNew, { loading, error, data }] = useMutation(ADD_QUERY, {
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
    // <View style={{ marginTop: 5, marginBottom: 20 }}>
    // <TextInput
    //   placeholder="Title..."
    //   style={styles.inputField}
    //   onChangeText={text => setTitle(text)}
    //   value={title}
    // />

    // <TextInput
    //   placeholder="Overview..."
    //   style={styles.inputField}
    //   onChangeText={text => setOverview(text)}
    //   value={overview}
    // />

    // <TextInput
    //   placeholder="Poster Path/URL..."
    //   style={styles.inputField}
    //   onChangeText={text => setPosterPath(text)}
    //   value={poster_path}
    // />

    // <TextInput
    //   placeholder="Popularity Scale..."
    //   style={styles.inputField}
    //   onChangeText={text => setPopularity(text)}
    //   value={popularity}
    // />

    // <TextInput
    //   placeholder="Tags..."
    //   style={styles.inputField}
    //   onChangeText={text => setTags(text.split(","))}
    //   value={tags.join(",")}
    // />

    // <TouchableOpacity
    //   style={{
    //     borderWidth: 1,
    //     padding: 3,
    //     alignSelf: "center",
    //     width: "30%"
    //   }}
    //   onPress={() => {
    //     addNew({
    //       variables: {
    //         title,
    //         overview,
    //         poster_path,
    //         popularity: parseFloat(popularity),
    //         tags
    //       }
    //     });
    //     setTitle("");
    //     setOverview("");
    //     setPosterPath("");
    //     setPopularity("");
    //     setTags([]);
    //   }}
    // >
    //   <Text>Submit</Text>
    // </TouchableOpacity>
    // </View>
    <View style={{ marginTop: 22 }}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{ marginTop: 22 }}>
          <View>
            <TextInput
              placeholder="Title..."
              style={styles.inputField}
              onChangeText={text => setTitle(text)}
              value={title}
            />

            <TextInput
              placeholder="Overview..."
              style={styles.inputField}
              onChangeText={text => setOverview(text)}
              value={overview}
            />

            <TextInput
              placeholder="Poster Path/URL..."
              style={styles.inputField}
              onChangeText={text => setPosterPath(text)}
              value={poster_path}
            />

            <TextInput
              placeholder="Popularity Scale..."
              style={styles.inputField}
              onChangeText={text => setPopularity(text)}
              value={popularity}
            />

            <TextInput
              placeholder="Tags..."
              style={styles.inputField}
              onChangeText={text => setTags(text.split(","))}
              value={tags.join(",")}
            />

            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 3,
                alignSelf: "center",
                width: "30%"
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
                setModalVisible(false);
                setTitle("");
                setOverview("");
                setPosterPath("");
                setPopularity("");
                setTags([]);
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 3,
                alignSelf: "center",
                width: "30%"
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          width: 320,
          height: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Ionicons name="ios-add" color="tomato" size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 200,
    marginBottom: 10,
    padding: 5
  }
});

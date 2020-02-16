import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View, Alert,  TextInput,
    Button, StyleSheet} from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
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
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $popularity: Int
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
export default function InputForm() {
  const [modal, setModal] = useState("false");
  const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading : loadSerial , error : errorSerial, data: serial } = useQuery(GET_SERIES)
  const [title, onChangeTitle] = useState("");
  const [popularity, onChangePopularity] = useState(null);
  const [path, onChangePath] = useState("");
  const [tags, onChangeTags] = useState([]);
  const [overview, onChangeOverview] = useState("")
  const [addMovies, { data: result }] = useMutation(ADD_MOVIE, {
    update(cache, { data: { addMovies } }) {
      const { movies } = cache.readQuery({ query: GET_MOVIES });
      cache.writeQuery({
        query: GET_MOVIES,
        data: { movies: movies.concat([addMovies]) }
      });
    }
  });

  const handleInput = () => {
      console.log(path, `IT'S THE PATHH`)
    addMovies({ variables: { title, popularity: Number(popularity), poster_path : path, tags, overview } });
    onChangePopularity(null)
    onChangePath('')
    onChangeTags([])
    onChangeOverview('')
    onChangeTitle('')
  };

 
  return (
    <View style={{ marginTop: 22 }}>
        <View style={{ marginTop: 22, opacity: 50}}>
          <View style={{ width: 300, height: 300}}>
            <Text style={styles.fontStyle}>Title</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={text => onChangeTitle(text)}
              value={title}
            />
            <Text style={styles.fontStyle}>Popularity</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={input => onChangePopularity(input)}
              value={popularity}
            />
            <Text style={styles.fontStyle}>Tags</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={input => onChangeTags(input.split(","))}
              value={tags.join(",")}
            />
            <Text style={styles.fontStyle}>Poster Path</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={url => onChangePath(url)}
              value={path}
            />

            <Text style={styles.fontStyle}>Overview</Text>
            <TextInput
              style={{
                height: 30,
                width: 200,
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={input => onChangeOverview(input)}
              value={overview}
            />

            <Button title="Submit" onPress={() => handleInput()}></Button>
          </View>
        </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black"
    },
    fontStyle: {
      color: 'black' 
    }
  });
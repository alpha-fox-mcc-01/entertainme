import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  Alert
} from "react-native";
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

export default function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES);
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
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  const handleInput = () => {
    addMovies({ variables: { title, popularity, path, tags, overview } });
    console.log(title, popularity, path, tags);
  };
  return (
    <ScrollView>
      <Text>Movie List</Text>
      <Text>Title</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => onChangeTitle(text)}
        value={title}
      />
      <Text>Popularity</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={input => onChangePopularity(Number(input))}
        value={popularity}
      />
      <Text>Tags</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={input => onChangeTags(input.split(","))}
        value={tags.join(",")}
      />
      <Text>Poster Path</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={input => onChangePath(input)}
        value={path}
      />

      <Text>Overview</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={input => onChangeOverview(input)}
        value={overview}
      />

      <Button title="Submit" onPress={() => handleInput()}></Button>
      {data.movies.map(movie => (
        <View key={movie._id}>
          <Text>{movie.title}</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: movie.poster_path }}
          ></Image>
        </View>
      ))}
    </ScrollView>
  );
}

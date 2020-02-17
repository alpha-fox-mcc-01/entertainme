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

const ADD_SERIES = gql`
  mutation AddSeries(
    $title: String
    $popularity: Int
    $tags: [String]
    $poster_path: String
    $overview: String
  ) {
    addSeries(
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
export default function InputSeries() {
  const [modal, setModal] = useState("false");
  const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading : loadSerial , error : errorSerial, data: serial } = useQuery(GET_SERIES)
  const [title, onChangeTitle] = useState("");
  const [popularity, onChangePopularity] = useState(null);
  const [path, onChangePath] = useState("");
  const [tags, onChangeTags] = useState([]);
  const [overview, onChangeOverview] = useState("")
  const [addSeries, { data: result }] = useMutation(ADD_SERIES, {
    update(cache, { data: { addSeries} }) {
      const { tvseries } = cache.readQuery({ query: GET_SERIES });
      console.log(cache)
      cache.writeQuery({
        query: GET_SERIES,
        data: { tvseries: tvseries.concat([addSeries]) }
      });
    }
  });

  const handleInput = () => {
      console.log(path, `IT'S THE PATHH`)
    addSeries({ variables: { title, popularity: Number(popularity), poster_path : path, tags, overview } });
    onChangePopularity(null)
    onChangePath('')
    onChangeTags([])
    onChangeOverview('')
    onChangeTitle('')
  };

 
  return (
    <View style={{ marginTop: 22, backgroundColor: 'black', flex: 1 }}>
        <View style={{ marginTop: 22, opacity: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={styles.fontStyle}>Add TV Series</Text>
          <View style={{ width: 300, height: 300, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
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
      color: 'red' 
    }
  });
import React, { useState } from "react";
import { Text, View, TextInput,
    Button, StyleSheet} from "react-native";
import {  useMutation } from "@apollo/react-hooks";
import { ADD_SERIES, GET_SERIES } from '../Queries';

export default function InputSeries() {
  const [title, onChangeTitle] = useState("");
  const [popularity, onChangePopularity] = useState(null);
  const [path, onChangePath] = useState("");
  const [tags, onChangeTags] = useState([]);
  const [overview, onChangeOverview] = useState("")
  const [addSeries] = useMutation(ADD_SERIES, {
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
              style={styles.inputStyle}
              onChangeText={text => onChangeTitle(text)}
              value={title}
            />
            <Text style={styles.fontStyle}>Popularity</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={input => onChangePopularity(input)}
              value={popularity}
            />
            <Text style={styles.fontStyle}>Tags</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={input => onChangeTags(input.split(","))}
              value={tags.join(",")}
            />
            <Text style={styles.fontStyle}>Poster Path</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={url => onChangePath(url)}
              value={path}
            />

            <Text style={styles.fontStyle}>Overview</Text>
            <TextInput
            style={styles.inputStyle}
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
    },
    inputStyle: {
      height: 30,
      width: 200,
      borderColor: "red",
      borderWidth: 1,
      borderRadius: 6,
      color: 'white'
    }
  });
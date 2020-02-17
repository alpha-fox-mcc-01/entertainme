import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
  } from "react-native";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";  


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


export default function ListMovie(props) {
    const { loading: loadSerial, error: errorSerial, data } = useQuery(
        GET_SERIES
      );

    return (
        <View style={styles.container}>
        <FlatList
          data={data.tvseries}
          renderItem={({ item }) => (
          
              <View style={styles.card}>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.poster_path }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textMargin}>
                  <Text style={{ color: "white" }}> {item.title}</Text>
                  <Text style={{ color: "white" }}> {item.popularity}</Text>
                  <Text style={{ color: "white" }}>
                  {item.overview}
                  </Text>
                </View>
              </View>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 15
    },
    image: {
      width: 100,
      height: 150,
      borderRadius: 6,
      borderColor: 'black'
    },
    header: {
      color: "red",
      fontWeight: "bold",
      fontSize: 20
    },
    card: {
      flexDirection: "row",
      margin: 2,
      backgroundColor: "black",
      alignItems: 'flex-start',
      flexShrink: 1
    },
    textMargin: {
      marginLeft: 4,
      marginTop: 3,
      flexShrink: 1
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  

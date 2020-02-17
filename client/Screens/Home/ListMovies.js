import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
  } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { Icon } from "native-base";
import { Header } from "react-native-elements";
import { GET_MOVIES } from '../../Queries';


const starCounter = (points) => {
  let stars = ''
  while ( points > 2) {
    points -= 2
    stars += '⭐'
    
  }
  return stars
}
export default function ListMovie({navigation}) {
    const { loading, error, data } = useQuery(GET_MOVIES);

    return (
        <View style={styles.container}>
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
        <FlatList
          data={data.movies}
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
                  <Text style={{ color: "white"}}> {item.popularity}     { starCounter(item.popularity)}</Text>
                  <Text style={{ color: "white" }}>
                    {item.overview.length > 180? item.overview.slice(0, 180).concat('...') : item.overview} 
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
      alignItems: 'flex-start'
    },
    textMargin: {
      flexShrink: 1,
      marginTop: 3
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  

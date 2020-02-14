import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ApolloClient from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import Home from './Home'
const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

export default function App() {

    return (
      <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Welcome</Text>
        <Home></Home>
      </View>
      </ApolloProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import MovieList from '../components/MovieList';
import AddForm from '../components/AddForm';
import Constants from 'expo-constants';
import MovieCard from '../components/MovieCard';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const Movie = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Please Wait...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const header = (
    <>
      <Text
        style={{
          marginTop: Constants.statusBarHeight,
          fontSize: 25,
          fontWeight: 'bold',
          color: 'red',
          alignSelf: 'center',
        }}
      >
        Movie
      </Text>
      <AddForm />
      <MovieList />
    </>
  );

  return (
    <FlatList
      ListHeaderComponent={header}
      data={data.movies}
      renderItem={({ item }) => <MovieCard movie={item} />}
      keyExtractor={item => item._id}
      style={styles.container}
    />
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

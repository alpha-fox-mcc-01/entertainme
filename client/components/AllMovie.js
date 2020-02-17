import React from 'react';
import MovieCard from './MovieCard';
import { View, Text, FlatList } from 'react-native';
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

const AllMovie = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Please Wait...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    // <FlatList
    //     data={data.movies}
    //     renderItem={({ item }) => <MovieCard movie={item} />}
    //     keyExtractor={item => item._id}
    //   />
    <View>
      {data.movies.map((movie, index) => {
        return <MovieCard movie={movie} key={'list' + String(movie._id)} />;
      })}
    </View>
  );
};

export default AllMovie;

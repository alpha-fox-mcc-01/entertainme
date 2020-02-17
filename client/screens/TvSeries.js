import React from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import TvSeriesList from '../components/TvSeriesList';
import AddFormTv from '../components/AddFormTv';
import TvSeriesCard from '../components/TvSeriesCard';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const GET_TVSERIES = gql`
  {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const TvSeries = () => {
  const { loading, error, data } = useQuery(GET_TVSERIES);

  if (loading) return <Text>Please Wait...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const header = (
    <>
      <Text
        style={{
          marginTop: Constants.statusBarHeight,
          fontSize: 25,
          fontWeight: 'bold',
          color: '#236B8E',
          alignSelf: 'center',
        }}
      >
        TvSeries
      </Text>
      <AddFormTv />
      <TvSeriesList />
    </>
  );
  return (
    <FlatList
      ListHeaderComponent={header}
      data={data.tvSeries}
      renderItem={({ item }) => <TvSeriesCard tvSeries={item} />}
      keyExtractor={item => item._id}
      style={styles.container}
    />
  );
};

export default TvSeries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

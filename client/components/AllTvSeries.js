import React from 'react';
import TvSeriesCard from './TvSeriesCard';
import { View, Text } from 'react-native';
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

const AllTvSeries = () => {
  const { loading, error, data } = useQuery(GET_TVSERIES);

  if (loading) return <Text>Please Wait...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data.tvSeries.map(tvSeries => {
        return (
          <TvSeriesCard
            tvSeries={tvSeries}
            key={'list' + String(tvSeries._id)}
          />
        );
      })}
    </View>
  );
};

export default AllTvSeries;

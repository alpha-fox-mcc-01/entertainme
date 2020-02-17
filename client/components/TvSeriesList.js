import React from 'react';
import { Text, StyleSheet, Dimensions, View, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Carousel from 'react-native-snap-carousel';

const GET_FIVE_TVSERIES = gql`
  {
    tvSeries(limit: 5) {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`;

const TvSeriesList = () => {
  const { loading, error, data } = useQuery(GET_FIVE_TVSERIES);

  if (loading) return <Text>Please Wait...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          resizeMode={'cover'}
          source={{ uri: item.poster_path }}
          style={[
            styles.slideInnerContainer,
            {
              height: '70%',
              // alignItems: 'center',
              borderRadius: 10,
            },
          ]}
        />
        <View
          style={{
            height: '20%',
            width: '100%',
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              color: 'black',
              // fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'serif',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {item.title}
          </Text>
          <Text style={{ color: '#5D92B1' }}>{item.tags[0]}</Text>
          <Text style={{ color: '#236B8E', fontSize: 12, fontWeight: 'bold' }}>
            {item.popularity}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Carousel
      ref={c => {
        _carousel = c;
      }}
      layout={'default'}
      data={data.tvSeries}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      style={{ marginBottom: 50 }}
    />
  );
};

const horizontalMargin = 0;
const slideWidth = 150;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 350;

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin,
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    // flex: 1,
    // other styles for the inner container
  },
});

export default TvSeriesList;

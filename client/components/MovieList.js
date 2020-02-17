import React from 'react';
import { Text, StyleSheet, Dimensions, View, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Carousel from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

const GET_FIVE_MOVIES = gql`
  {
    movies(limit: 5) {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`;

const MovieList = () => {
  const { loading, error, data } = useQuery(GET_FIVE_MOVIES);

  if (loading) return <Text style={{ color: 'white' }}>Please Wait...</Text>;
  if (error)
    return <Text style={{ color: 'white' }}>Error: {error.message}</Text>;

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
            backgroundColor: 'black',
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              color: 'black',
              // fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'serif',
              color: 'white',
            }}
          >
            {item.title}
          </Text>
          <Text style={{ color: 'red' }}>{item.tags[0]}</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Stars
              default={Math.floor(item.popularity) / 2}
              count={5}
              half={true}
              starSize={50}
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={'star-outline'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={'star-half'} style={[styles.myStarStyle]} />
              }
            />
          </View>
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
      data={data.movies}
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
  myStarStyle: {
    color: 'gold',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: 'gold',
  },
});

export default MovieList;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

const MovieCard = props => {
  const { title, overview, poster_path, popularity, tags } = props.movie;
  return (
    <View style={{ flexDirection: 'row', height: 200, padding: 10 }}>
      <Image
        resizeMode={'cover'}
        source={{ uri: poster_path }}
        style={{
          width: '30%',
          height: '100%',
          alignItems: 'center',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          height: '100%',
          width: '70%',
          justifyContent: 'space-between',
          // alignItems: 'center',
          backgroundColor: 'black',
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'serif',
              color: 'white',
            }}
          >
            {title}
          </Text>
          {/* <Text style={{ color: 'gold', fontSize: 15, fontWeight: 'bold' }}>
            {popularity}
          </Text> */}
          <View style={{ alignItems: 'flex-start' }}>
            <Stars
              default={Math.floor(popularity) / 2}
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
        <Text style={{ color: 'grey', fontSize: 12 }}>{overview}</Text>
        <View style={{ flexDirection: 'row' }}>
          {tags.map((tag, index) => {
            return (
              <Text
                key={tag}
                style={{
                  borderColor: 'red',
                  color: 'red',
                  paddingHorizontal: 5,
                  borderWidth: 0.5,
                  fontSize: 12,
                  marginHorizontal: 3,
                  marginTop: 5,
                }}
              >
                {tag}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'red',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: 'red',
  },
});

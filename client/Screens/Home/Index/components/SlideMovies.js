import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import Carousel from "react-native-snap-carousel";

export default function SlideMovies(props) {
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
        <Image
            style={{ width: 150, height: 200, resizeMode: 'stretch', borderRadius: 4  }}
            source={{ uri: item.poster_path }}
          ></Image>
        <Text style={{color: 'white'}}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <Carousel
      ref={c => {
        _carousel = c;
      }}
      layout={"default"}
      data={props.movies}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
}

const horizontalMargin = 0;
const slideWidth = 150;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 250;

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1
    // other styles for the inner container
  }
});

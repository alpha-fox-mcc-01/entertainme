import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Carousel from "react-native-snap-carousel";

export default function SlideSeries(props) {
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
        <Image
            style={{ width: 150, height: 200, resizeMode: 'stretch' }}
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
      data={props.tvseries}
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
const itemHeight = 300;

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

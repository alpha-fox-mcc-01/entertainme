import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import TvSeriesList from '../components/TvSeriesList';
import AddFormTv from '../components/AddFormTv';
import AllTvSeries from '../components/AllTvSeries';
import Constants from 'expo-constants';

const TvSeries = () => {
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          marginTop: Constants.statusBarHeight,
          fontSize: 25,
          fontWeight: 'bold',
          color: '#236B8E',
          alignSelf: 'center',
        }}
      >
        Tv Series
      </Text>
      <AddFormTv />
      <TvSeriesList />
      <AllTvSeries />
    </ScrollView>
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

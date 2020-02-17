import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from '../styles/searchResultRow.style'

export default function SearchResultRow({ data, navigation }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('MovieDetail', { imdbId: data.imdbId })
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: data.poster_path,
          }}
        />
        <View style={styles.caption}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import styles from '../styles/watchListRow.style'

export default function WatchList({ movie, no, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('WatchlistDetail', { imdbId: movie.imdbId, _id: movie._id })
      }}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { marginRight: 20 }]}>{no + 1}.</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from '../styles/movieCard.style'

export default function MovieCard({ data, navigation }) {
  let { title, poster_path, popularity } = data
  if (title.length > 14) {
    title = title.substring(0, 14)
    title += '…'
  }

  if (!poster_path) {
    poster_path = 'http://placekitten.com/400/600'
  }

  if (!popularity) {
    popularity = 0
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WatchlistDetail', { imdbId: data.imdbId, _id: data._id })
        }}
      >
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnail}
            source={{
              uri: poster_path,
            }}
          />
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.onCardPlayButton}>
        <Text style={styles.rating}>{popularity}</Text>
      </View>
    </View>
  )
}

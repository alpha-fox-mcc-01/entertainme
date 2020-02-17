import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { GETALL_MOVIES } from '../graphql/queries'
import { DELETE_WATCHLIST } from '../graphql/mutations'
import styles from '../styles/movieCard.style'

export default function MovieCard({ data, navigation }) {
  let { title, poster_path, popularity, _id } = data

  const [deleteWatchlist] = useMutation(DELETE_WATCHLIST, {
    update(cache, { data: deleteMovie }) {
      const { movies } = cache.readQuery({ query: GETALL_MOVIES })

      cache.writeQuery({
        query: GETALL_MOVIES,
        data: {
          movies: movies.filter((row) => row._id !== _id),
        },
      })
    },
  })

  const [isWiggling, setIsWiggle] = useState(true)
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

  useEffect(() => {
    const wiggle = Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(animatedValue, {
          toValue: 0.1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(animatedValue, {
          toValue: -0.1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(animatedValue, {
          toValue: 0.0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    )

    if (isWiggling === true) {
      wiggle.stop()
    } else {
      wiggle.start()
    }
  }, [isWiggling])

  function handleLongPress(data) {
    setIsWiggle(!isWiggling)
  }

  const animatedValue = new Animated.Value(0)
  const wiggle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-0.1rad', '0.1rad'],
        }),
      },
    ],
  }

  function confirmRemove() {
    setIsWiggle(!isWiggling)
    deleteWatchlist({ variables: { id: _id } })
  }
  return (
    <View>
      <Animated.View style={[styles.cardContainer, wiggle]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WatchlistDetail', { imdbId: data.imdbId, _id: data._id })
          }}
          onLongPress={() => {
            handleLongPress(data)
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
      </Animated.View>
      {!isWiggling && (
        <TouchableOpacity
          onPress={() => {
            confirmRemove()
          }}
          style={styles.onCardDeleteButton}
        >
          <Text style={styles.deleteConfirm}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import styles from '../styles/movieDetail.style'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MOVIE } from '../graphql/queries'
import { ADD_MOVIETOWATCHLIST } from '../graphql/mutations'

export default function MovieDetail({ route, navigation }) {
  const imdbId = route.params.imdbId
  const [addMovieToWatchlist] = useMutation(ADD_MOVIETOWATCHLIST)
  const { loading, error, data, refetch } = useQuery(GET_MOVIE, {
    variables: {
      imdbId: imdbId,
    },
  })
  useEffect(() => {
    refetch()
  }, [])

  function addToWatchlist(title, year, popularity, imdbId, poster_path) {
    addMovieToWatchlist({
      variables: {
        title,
        year,
        popularity,
        imdbId,
        poster_path,
      },
    })
      .then(() => {
        alert(`${title} added to watchlist`)
        navigation.navigate('CurrentWatchList')
      })
      .catch(() => {
        alert('failed to add watchlist')
      })
  }

  if (error) {
    return <Text>Error! {JSON.stringify(error)}</Text>
  } else if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>pls wait~</Text>
      </View>
    )
  } else if (data) {
    const { poster_path, title, year, popularity, overview } = data.discoverMovie
    return (
      <View style={styles.container}>
        <Image source={{ uri: poster_path }} style={styles.background} />
        {/* <View style={styles.backgroundTinter} /> */}
        <LinearGradient
          colors={['rgba(52,55,70,0.7)', 'rgba(52,55,70,1)']}
          start={[0, 0]}
          end={[0, 0.5]}
          style={styles.backgroundTinter}
        />
        <View style={styles.movieDetailContainer}>
          <View style={styles.mainInfo}>
            <Image source={{ uri: poster_path }} style={styles.thumbnail} />
            <View style={{ width: '100%', flexShrink: 1 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.info}>Year: {year}</Text>
              <Text style={styles.info}>Rating: {popularity}</Text>
              <Text style={styles.info}>Synopsis:</Text>
              <Text style={styles.info}>{overview}</Text>
            </View>
          </View>

          <View style={styles.addtoWatchlistButton}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                addToWatchlist(title, year, popularity, imdbId, poster_path)
              }}
            >
              <Text>Add to WatchList</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

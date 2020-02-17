import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import styles from '../styles/watchlistDetail.style'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MOVIE, GET_TAGS, GETALL_MOVIES } from '../graphql/queries'
import { CHANGE_TAGS, DELETE_WATCHLIST } from '../graphql/mutations'

export default function WatchlistDetail({ route, navigation }) {
  const [imdbId, setImdbId] = useState(route.params.imdbId)
  const [_id, set_id] = useState(route.params._id)
  const [showForm, setShowForm] = useState(false)
  const [inputtedTags, setInputtedTags] = useState('')

  const [changeTags] = useMutation(CHANGE_TAGS)
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

  const { loading, error, data, refetch } = useQuery(GET_MOVIE, {
    variables: { imdbId: imdbId },

    // pass notifyOnNetworkStatusChange option to true so our query component re-renders while a refetch is in flighta
    notifyOnNetworkStatusChange: true,
  })
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
    refetch: tagsRefetch,
  } = useQuery(GET_TAGS, {
    variables: {
      id: _id,
    },
  })

  useEffect(() => {
    refetch()
    tagsRefetch()
  }, [])

  if (error || tagsError) {
    return (
      <Text>
        Error! {JSON.stringify(error)} {JSON.stringify(tagsError)}
      </Text>
    )
  }

  if (loading || tagsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>pls wait~</Text>
      </View>
    )
  }

  if (data && tagsData) {
    const { tags } = tagsData.movie
    const { poster_path, title, year, popularity, overview } = data.discoverMovie
    return (
      <View style={styles.container}>
        <Image source={{ uri: poster_path }} style={styles.background} />
        <LinearGradient
          colors={['rgba(52,55,70,0.4)', 'rgba(52,55,70,0.9)']}
          start={[0, 0]}
          end={[0, 0.6]}
          style={styles.backgroundTinter}
        />
        <View style={styles.movieDetailContainer}>
          <View style={styles.mainInfo}>
            <Image source={{ uri: poster_path }} style={styles.thumbnail} />
            <View style={{ width: '100%', flexShrink: 1 }}>
              <Text style={styles.title}>❤️ {title}</Text>
              <Text style={styles.info}>Year: {year}</Text>
              <Text style={styles.info}>Rating: {popularity}</Text>
              <Text style={styles.info}>Synopsis:</Text>
              <Text style={styles.info}>{overview}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {tags !== undefined &&
              tags.map((tag, i) => (
                <Text key={i} style={styles.tags}>
                  🏷{tag}
                </Text>
              ))}
          </View>

          <View style={styles.tagform}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowForm(!showForm)
              }}
            >
              <Text>Add Custom tags</Text>
            </TouchableOpacity>
            {showForm && (
              <TextInput
                style={styles.formControl}
                placeholder='enter to add tags, comma separated'
                onChangeText={(value) => {
                  setInputtedTags(value)
                }}
                value={inputtedTags}
                onSubmitEditing={() => {
                  let stringifiedTags
                  if (tags.length >= 1) {
                    stringifiedTags = tags.join(',')
                    stringifiedTags += `,${inputtedTags}`
                  } else {
                    stringifiedTags = inputtedTags
                  }
                  changeTags({
                    variables: {
                      id: _id,
                      tags: stringifiedTags,
                    },
                  }).then(() => {
                    tagsRefetch()
                    setInputtedTags('')
                  })
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => {
              deleteWatchlist({ variables: { id: _id } }).then(() => {
                alert('watchlist deleted')
                navigation.navigate('CurrentWatchList')
              })
            }}
          >
            <Text style={styles.outlineText}>Remove From Watch list</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

import React, { useEffect, useState } from 'react'
import { Text, TextInput, ScrollView, View, FlatList } from 'react-native'
import styles from '../styles/index.style'
import MovieCard from './MovieCard'

import { useQuery } from '@apollo/react-hooks'
import { GETALL_MOVIES } from '../graphql/queries'

export default function Section({ header, navigation }) {
  const [keyword, setKeyword] = useState('')
  let query
  if (header == 'Movies') {
    query = GETALL_MOVIES
  } else if (header == 'TV Series') {
    query = GETALL_MOVIES
  }
  const { loading, error, data, refetch } = useQuery(query)

  useEffect(() => {
    navigation.addListener('focus', (payload) => {
      refetch()
    })
  }, [])

  if (loading) {
    return <Text>Loading</Text>
  } else {
    let renderData = data.movies
    if (keyword.length > 0) {
      renderData = data.movies.filter((row) => row.title.includes(keyword))
    } else {
      renderData = data.movies
    }

    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{header}</Text>
          <TextInput
            style={styles.watchlistSearchBar}
            autoCompleteType='off'
            blurOnSubmit={true}
            clearTextOnFocus={true}
            placeholder={'fliter...'}
            returnKeyType='search'
            value={keyword}
            onChangeText={(value) => {
              setKeyword(value)
            }}
          />
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.watchlistBar}
            horizontal={true}
            data={renderData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <MovieCard navigation={navigation} data={item} />
            }}
          />
        </View>
      </View>
    )
  }
}

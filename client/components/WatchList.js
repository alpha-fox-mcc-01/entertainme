import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from '../styles/watchList.style'
import WatchListRow from './WatchListRow'

import { useQuery } from '@apollo/react-hooks'
import { GETALL_MOVIES } from '../graphql/queries'

export default function WatchList({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GETALL_MOVIES)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    navigation.addListener('focus', (payload) => {
      refetch()
    })
  }, [])

  if (loading)
    return (
      <View style={styles.container}>
        <Text>pls Wait</Text>
      </View>
    )

  if (data) {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Watchlist</Text>
          {/* <TextInput
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
          /> */}
        </View>
        <View style={styles.watchlistContainer}>
          {data.movies.map((movie, i) => {
            return <WatchListRow navigation={navigation} key={i} movie={movie} no={i} />
          })}
        </View>
      </View>
    )
  }
}

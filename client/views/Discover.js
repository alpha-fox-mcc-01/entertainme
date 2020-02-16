import React, { useState } from 'react'
import {
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native'

import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { SEARCH_MOVIES } from '../graphql/queries'

import styles from '../styles/discover.style'
import SearchResultRow from '../components/SearchResultRow'

export default function Discover({ navigation }) {
  const [keyword, setKeyword] = useState('')
  const [submittedKeyword, setSubmittedKeyword] = useState('')
  const [runQuery, { called, loading, data }] = useLazyQuery(SEARCH_MOVIES)

  function discover(keyword) {
    setSubmittedKeyword(keyword)
    runQuery({
      variables: {
        keyword: keyword,
      },
    })
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarTitle}>D I S C O V E R</Text>
          <TextInput
            value={keyword}
            style={styles.discoverSearchBar}
            placeholder='search'
            onChangeText={(text) => {
              setKeyword(text)
            }}
            onSubmitEditing={() => discover(keyword)}
            returnKeyType='search'
          />
        </View>
        <View style={styles.searchResultContainer}>
          <Text style={styles.searchResultHeader}>please wait</Text>
        </View>
      </View>
    )
  } else if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarTitle}>D I S C O V E R</Text>
          <TextInput
            value={keyword}
            style={styles.discoverSearchBar}
            placeholder='search'
            onChangeText={(text) => {
              setKeyword(text)
            }}
            onSubmitEditing={() => discover(keyword)}
            returnKeyType='search'
          />
        </View>
        <ScrollView>
          <View style={styles.searchResultContainer}>
            <Text style={styles.searchResultHeader}>
              {submittedKeyword === ''
                ? 'discover movies / tv series'
                : submittedKeyword + ' :'}
            </Text>
            <FlatList
              data={data.searchMovie}
              horizontal={true}
              keyExtractor={(item) => item.imdbId}
              renderItem={({ item }) => {
                return <SearchResultRow data={item} navigation={navigation} />
              }}
            />
          </View>
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarTitle}>D I S C O V E R</Text>
          <TextInput
            value={keyword}
            style={styles.discoverSearchBar}
            placeholder='search'
            onChangeText={(text) => {
              setKeyword(text)
            }}
            onSubmitEditing={() => discover(keyword)}
            returnKeyType='search'
          />
        </View>
        <ScrollView>
          <View style={styles.searchResultContainer}>
            <Text style={styles.searchResultHeader}>
              {submittedKeyword === '' ? 'discover movies / tv series' : submittedKeyword}
            </Text>
            {/* <Text>{JSON.stringify(data)}</Text> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

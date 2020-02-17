import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import client from './api/ApolloClient'
import CurrentWatchList from './views/CurrentWatchlist'
import Discover from './views/Discover'
import MovieDetail from './views/MovieDetail'
import WatchlistDetail from './views/WatchlistDetail'

const Stack = createStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator mode='card' headerMode='none'>
          <Stack.Screen name='CurrentWatchList' component={CurrentWatchList} />
          <Stack.Screen name='Discover' component={Discover} />
          <Stack.Screen name='MovieDetail' component={MovieDetail} />
          <Stack.Screen name='WatchlistDetail' component={WatchlistDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

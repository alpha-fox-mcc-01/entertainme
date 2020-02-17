import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    marginLeft: Constants.statusBarHeight,
    flexWrap: 'wrap',
  },
})

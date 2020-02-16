import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    margin: 16,
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 200,
    height: 400,
    borderRadius: 6,
  },
  caption: {
    padding: 8,
    backgroundColor: 'rgba(52, 55, 70, 0.6)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  title: {
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    color: colors.accent.white,
    fontSize: 20,
  },
})

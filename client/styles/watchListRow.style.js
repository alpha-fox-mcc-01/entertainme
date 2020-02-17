import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    marginHorizontal: Constants.statusBarHeight,
    backgroundColor: colors.bgLighterDark,
    marginVertical: 2,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    color: colors.accent.white,
    fontWeight: 'bold',
  },
})

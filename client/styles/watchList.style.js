import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    marginHorizontal: Constants.statusBarHeight,
    backgroundColor: colors.bgLighterDark,
    marginVertical: 2,
    padding: 20,
    flexWrap: 'wrap',
    borderRadius: 5,
  },
  headerContainer: {
    marginLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: colors.accent.white,
    fontWeight: 'bold',
  },
  watchlistContainer: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 110,
  },
  headerTitle: {
    fontSize: 34,
    color: colors.accent.white,
  },
  watchlistSearchBar: {
    color: colors.accent.white,
    backgroundColor: colors.bgLighterDark,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    padding: 14,
    paddingLeft: 30,
    width: 180,
    fontSize: 16,
  },
})

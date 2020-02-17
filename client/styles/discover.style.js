import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: colors.bgDark,
  },
  searchBarContainer: {
    alignItems: 'center',
  },
  searchBarTitle: {
    fontSize: 34,
    color: colors.accent.white,
  },
  discoverSearchBar: {
    color: colors.accent.white,
    backgroundColor: colors.bgLighterDark,
    borderRadius: 28,
    padding: 14,
    paddingHorizontal: 28,
    width: 180,
    fontSize: 16,
    width: '80%',
    borderWidth: 1,
    marginVertical: Constants.statusBarHeight,
  },
  formContainer: {
    padding: Constants.statusBarHeight,
  },
  formLabel: {
    color: colors.accent.white,
    marginBottom: 8,
    fontSize: 20,
  },
  formControl: {
    backgroundColor: colors.bgLighterDark,
    color: colors.accent.white,
    padding: 14,
    borderRadius: 6,
    marginBottom: 20,
  },

  searchResultContainer: {
    alignItems: 'center',
  },
  searchResultHeader: {
    color: colors.accent.white,
    fontSize: 24,
    borderBottomWidth: 1,
    padding: 4,
    marginBottom: Constants.statusBarHeight,
    borderColor: colors.accent.yellow,
  },
})

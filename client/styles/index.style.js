import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
const screenWidth = Dimensions.get('window').width

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: colors.bgDark,
    paddingBottom: 60,
  },
  headerContainer: {
    marginLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  watchlistBar: {
    flexDirection: 'row',
    paddingLeft: Constants.statusBarHeight,
    paddingVertical: Constants.statusBarHeight,
  },
  discoverContainer: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverHeader: {
    fontSize: 34,
    color: colors.accent.white,
    borderBottomColor: colors.accent.yellow,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
  },
  discoverSubHeader: {
    fontSize: 18,
    color: colors.accent.white,
  },
  addButton: {
    elevation: 3,
    margin: 24,
    padding: 20,
    backgroundColor: colors.accent.yellow,
    borderRadius: 40,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
})

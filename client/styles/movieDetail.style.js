import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
const screenWidth = Dimensions.get('window').width

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: colors.bgDark,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: colors.bgDark,
  },
  loading: {
    color: colors.accent.white,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '110%',
    borderRadius: 6,
  },
  backgroundTinter: {
    position: 'absolute',
    width: '100%',
    height: '110%',
  },
  thumbnail: {
    width: 200,
    height: 400,
    borderRadius: 6,
  },
  movieDetailContainer: {
    marginTop: 200,
    flex: 1,
    marginHorizontal: Constants.statusBarHeight,
    flexShrink: 1,
  },
  mainInfo: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    marginHorizontal: Constants.statusBarHeight,
    fontSize: 30,
    color: colors.accent.white,
    marginBottom: 10,
  },
  info: {
    marginTop: 10,
    color: colors.accent.white,
    marginHorizontal: Constants.statusBarHeight,
    fontSize: 16,
  },
  addtoWatchlistButton: {
    marginTop: Constants.statusBarHeight * 3,
    flexShrink: 1,
    alignItems: 'center',
  },
  btn: {
    width: 160,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    borderRadius: 36,
    backgroundColor: colors.accent.yellow,
  },
})

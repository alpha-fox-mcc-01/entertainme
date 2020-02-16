import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: colors.bgDark,
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
    marginTop: 100,
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
  btn: {
    flexShrink: 1,
    marginTop: Constants.statusBarHeight,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    borderRadius: 6,
    width: 200,
    backgroundColor: colors.accent.yellow,
  },
  btnOutline: {
    flexShrink: 1,
    marginTop: Constants.statusBarHeight,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: 200,
    borderColor: colors.accent.yellow,
  },
  outlineText: {
    color: colors.accent.yellow,
  },
  tagform: {
    flexDirection: 'row',
  },
  formControl: {
    flexGrow: 1,
    marginLeft: Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight,
    borderColor: colors.accent.yellow,
    borderWidth: 1,
    borderRadius: 6,
    color: colors.accent.white,
    padding: 12,
  },
})

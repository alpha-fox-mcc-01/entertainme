import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import colors from './colorPallete.color'

const thumbnailWidth = 200

export default StyleSheet.create({
  cardContainer: {
    marginRight: 16,
    paddingBottom: Constants.statusBarHeight,
  },
  thumbnailContainer: {
    backgroundColor: colors.bgDarkerDark,
    width: thumbnailWidth,
    borderRadius: 6,
  },
  thumbnail: {
    width: thumbnailWidth,
    height: 350,
    borderRadius: 6,
  },
  captionContainer: {
    width: thumbnailWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.accent.white,
  },
  onCardPlayButton: {
    position: 'absolute',
    bottom: 40,
    right: -10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    elevation: 2,
    borderRadius: 4,
    backgroundColor: colors.bgLighterDark,
  },
  onCardDeleteButton: {
    position: 'absolute',
    right: 10,
    padding: 16,
    alignSelf: 'center',
    elevation: 3,
    borderRadius: 28,
    backgroundColor: '#b22',
  },
  deleteConfirm: {
    color: colors.accent.white,
  },
  rating: {
    color: colors.accent.yellow,
    fontSize: 18,
    paddingHorizontal: 10,
  },
})

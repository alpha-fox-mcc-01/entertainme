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
    width: thumbnailWidth,
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
    elevation: 3,
    borderRadius: 28,
    backgroundColor: colors.bgLighterDark,
  },
  rating: {
    color: colors.accent.yellow,
    fontSize: 18,
    paddingHorizontal: 10,
  },
})

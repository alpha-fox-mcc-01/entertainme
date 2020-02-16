import { gql } from 'apollo-boost'

export const ADD_MOVIETOWATCHLIST = gql`
  mutation AddMovieToWatchlist(
    $imdbId: String
    $title: String!
    $popularity: Float
    $poster_path: String
  ) {
    addMovie(
      imdbId: $imdbId
      title: $title
      popularity: $popularity
      poster_path: $poster_path
    ) {
      imdbId
      title
      popularity
      poster_path
    }
  }
`
export const CHANGE_TAGS = gql`
  mutation ChangeTags($id: String!, $tags: String) {
    changeTags(id: $id, tags: $tags) {
      tags
    }
  }
`
export const DELETE_WATCHLIST = gql`
  mutation DeleteWatchlist($id: String!) {
    deleteMovie(id: $id)
  }
`

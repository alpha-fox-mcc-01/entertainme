import { gql } from 'apollo-boost'

export const GETALL_MOVIES = gql`
  query {
    movies {
      _id
      title
      popularity
      poster_path
      imdbId
    }
  }
`

export const GET_FAVES = gql`
  query {
    movies {
      _id
      title
      popularity
      poster_path
      imdbId
    }
  }
`

export const GET_TAGS = gql`
  query GetTags($id: String!) {
    movie(id: $id) {
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query GetMovie($imdbId: String!) {
    discoverMovie(imdbId: $imdbId) {
      _id
      title
      popularity
      poster_path
      overview
      year
      tags
      cast {
        actor
        character
      }
    }
  }
`

export const SEARCH_MOVIES = gql`
  query SearchMovies($keyword: String!) {
    searchMovie(keyword: $keyword) {
      imdbId
      title
      poster_path
    }
  }
`

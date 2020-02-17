import { gql } from "apollo-boost";

const GET_TV_SERIES = gql`
  {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addMovie(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const ADD_TV_SERIES = gql`
  mutation AddTvSeries(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addTvSeries(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const EDIT_MOVIE = gql`
  mutation EditMovie(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    editMovie(
      id: $id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const EDIT_TV_SERIES = gql`
  mutation EditTvSeries(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    editTvSeries(
      id: $id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_TV_SERIES = gql`
  mutation DeleteTvSeries($id: ID) {
    deleteTvSeries(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default {
  GET_MOVIES,
  GET_TV_SERIES,
  ADD_MOVIE,
  ADD_TV_SERIES,
  EDIT_MOVIE,
  EDIT_TV_SERIES,
  DELETE_MOVIE,
  DELETE_TV_SERIES
};

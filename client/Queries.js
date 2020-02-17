import  { gql } from "apollo-boost";


export const GET_MOVIES = gql`
{
  movies {
    _id
    title
    overview
    poster_path
    popularity
  }
}
`;

export const GET_SERIES = gql`
  {
    tvseries {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $popularity: Float
    $tags: [String]
    $poster_path: String
    $overview: String
  ) {
    addMovies(
      title: $title
      popularity: $popularity
      tags: $tags
      poster_path: $poster_path
      overview: $overview
    ) {
      _id
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;  

export const ADD_SERIES = gql`
  mutation AddSeries(
    $title: String
    $popularity: Float
    $tags: [String]
    $poster_path: String
    $overview: String
  ) {
    addSeries(
      title: $title
      popularity: $popularity
      tags: $tags
      poster_path: $poster_path
      overview: $overview
    ) {
      _id
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;  


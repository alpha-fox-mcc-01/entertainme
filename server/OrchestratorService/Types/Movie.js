const { gql } = require('apollo-server');
const axios = require('../api/movieAxios');

const movieType = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type ResponseMovie {
    message: String
  }

  extend type Query {
    movies(limit: Int): [Movie]
  }

  extend type Mutation {
    addMovie(movie: MovieInput): Movie
    deleteMovie(id: ID): ResponseMovie
    editMovie(id: ID, movie: MovieInput): Movie
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`;

const movieResolver = {
  Query: {
    movies: async (parent, args) => {
      if (args.limit) {
        const { data } = await axios.get('/limit');
        return data;
      } else {
        const { data } = await axios.get('/');
        return data;
      }
    },
  },
  Mutation: {
    addMovie: async (parent, args) => {
      const { title, overview, poster_path, popularity, tags } = args.movie;
      const { data } = await axios.post('/', {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      return data;
    },
    editMovie: async (parent, args) => {
      const { id } = args;
      const { title, overview, poster_path, popularity, tags } = args.movie;
      const { data } = await axios.put('/' + id, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      return data;
    },
    deleteMovie: async (parent, args) => {
      const { id } = args;
      const { data } = await axios.delete('/' + id);
      return data;
    },
  },
};

module.exports = {
  movieType,
  movieResolver,
};

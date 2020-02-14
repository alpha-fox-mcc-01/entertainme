const { gql } = require("apollo-server");
const moviesInstance = require("../axiosInstances/moviesInstance");

const movieDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
  }

  extend type Mutation {
    addMovie(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie

    editMovie(
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie

    deleteMovie(id: ID): Movie
  }
`;

const moviesResolver = {
  Query: {
    movies: async () => {
      const { data } = await moviesInstance({
        method: "GET"
      });
      return data;
    }
  },
  Mutation: {
    addMovie: async (parent, args) => {
      const { data } = await movieInstance({
        method: "POST",
        data: {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags
        }
      });
      return data;
    },
    editMovie: async (parent, args) => {
      const { data } = await moviesInstance({
        method: "PUT",
        data: {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags
        },
        params: {
          id: args.id
        }
      });
      return data;
    },
    deleteMovie: async (parent, args) => {
      const { data } = await moviesInstance({
        url: `${args.id}`,
        method: "DELETE"
      });
      return data;
    }
  }
};
module.exports = { movieDefs, moviesResolver };

const PORT = process.env.PORT || 3000;
const movieInstance = require("./apis/movieInstance");
const tvseriesInstance = require("./apis/tvseriesInstance");

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  type TVSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type Query {
    movies: [Movie]
    tvseries: [TVSeries]
  }

  type Mutation {
    addMovies(
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: [String]
    ): Movie
    editMovie(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: [String]
    ): Movie
    deleteMovie(_id: ID): Movie
    addSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: [String]
    ): TVSeries
    editSeries(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Int
      tags: [String]
    ): TVSeries
    deleteSeries(_id: ID): TVSeries
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const { data } = await movieInstance.get("movies");
      return data;
    },
    tvseries: async () => {
      const { data } = await tvseriesInstance.get("tv");
      return data;
    }
  },
  Mutation: {
    addMovies: async (parent, args) => {
      const {
        data: { result }
      } = await movieInstance.post("movies", {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      });
      return result;
    },
    editMovie: async (parent, args) => {
      const {
        data: { result }
      } = await movieInstance.put("movies/" + args._id, {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      });
      return result;
    },
    deleteMovie: async (parents, args) => {
      const {
        data: { result }
      } = await movieInstance.delete("movies/" + args._id);
      return result;
    },
    addSeries: async (parents, args) => {
      const {
        data: { result }
      } = await tvseriesInstance.post("tv", {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      });
      return data
    },
    editSeries: async (parents, args) => {
      const {
        data: { result }
      } = await tvseriesInstance.put("series/" + args._id, {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      });
      return result;
    },
    deleteSeries: async (parents, args) => {
      const {
        data: { result }
      } = await tvseriesInstance.delete("tv/" + args._id);
      return result;
    }
  }
};


const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const { gql } = require("apollo-server");
const tvSeriesInstance = require("../axiosInstances/tvSeriesInstance");

const tvSeriesDefs = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvSeries: [TvSeries]
  }

  extend type Mutation {
    addTvSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): TvSeries

    editTvSeries(
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): TvSeries

    deleteTvSeries(id: ID): TvSeries
  }
`;

const tvSeriesResolver = {
  Query: {
    tvSeries: async () => {
      const { data } = await tvSeriesInstance({
        method: "GET"
      });
      return data;
    }
  },
  Mutation: {
    addTvSeries: async (parent, args) => {
      const { data } = await tvSeriesInstance({
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
    deleteTvSeries: async (parent, args) => {
      const { data } = await tvSeriesInstance({
        url: `${args.id}`,
        method: "DELETE"
      });
      return data;
    }
  }
};
module.exports = { tvSeriesDefs, tvSeriesResolver };

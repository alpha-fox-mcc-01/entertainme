const { gql } = require('apollo-server');
const axios = require('../api/tvSeriesAxios');

const tvSeriesType = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type ResponseTvSeries {
    message: String
  }

  extend type Query {
    tvSeries(limit: Int): [TvSeries]
  }

  extend type Mutation {
    addTvSeries(tvSeries: TvSeriesInput): TvSeries
    deleteTvSeries(id: ID): ResponseTvSeries
    editTvSeries(id: ID, tvSeries: TvSeriesInput): TvSeries
  }

  input TvSeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`;

const tvSeriesResolver = {
  Query: {
    tvSeries: async (parent, args) => {
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
    addTvSeries: async (parent, args) => {
      const { title, overview, poster_path, popularity, tags } = args.tvSeries;
      const { data } = await axios.post('/', {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      return data;
    },
    editTvSeries: async (parent, args) => {
      const { id } = args;
      const { title, overview, poster_path, popularity, tags } = args.tvSeries;
      const { data } = await axios.put('/' + id, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      return data;
    },
    deleteTvSeries: async (parent, args) => {
      const { id } = args;
      const { data } = await axios.delete('/' + id);
      return data;
    },
  },
};

module.exports = {
  tvSeriesType,
  tvSeriesResolver,
};

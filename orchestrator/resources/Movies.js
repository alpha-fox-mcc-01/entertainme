const { gql } = require('apollo-server')
const movieService = require('../api/movieService')
const imdbApi = require('../api/imdbApi')

const movieTypeDefs = gql`
  type Tags {
    name: [String]
  }

  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    imdbId: String
    year: String
    rating_votes: String
    trailer: String
    tags: [String]
    cast: [Cast]
  }

  type Cast {
    actor: String
    character: String
  }

  extend type Query {
    movies: [Movie]
    movie(id: String!): Movie
    searchMovie(keyword: String!): [Movie]
    discoverMovie(imdbId: String!): Movie
  }

  extend type Mutation {
    addMovie(
      title: String!
      overview: String
      poster_path: String
      popularity: Float
      tags: String
      imdbId: String
    ): Movie
    deleteMovie(id: String!): String
    changeTags(id: String, tags: String): Movie
    updateMovie(
      imdbId: String
      id: String!
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: String
    ): Movie
  }
`
const movieResolvers = {
  Query: {
    movie: async (parent, args, context, info) => {
      const { data } = await movieService({
        method: 'get',
        url: `/movies/${args.id}`,
      })
      return data
    },
    movies: async () => {
      const { data } = await movieService({
        method: 'get',
        url: '/movies',
      })
      return data
    },
    searchMovie: async (parent, args) => {
      const { data } = await imdbApi({
        method: 'get',
        url: '/search/' + args.keyword,
      })
      const searchResults = data.titles
      let response = []
      searchResults.forEach((result) => {
        response.push({
          imdbId: result.id,
          title: result.title,
          poster_path: result.image,
        })
      })

      return response
    },
    discoverMovie: async (parent, args) => {
      const { data } = await imdbApi({
        method: 'get',
        url: '/film/' + args.imdbId,
      })
      return {
        title: data.title,
        poster_path: data.poster,
        popularity: Number(data.rating),
        overview: data.plot,
        imdbId: data.id,
        year: data.year,
        rating_votes: data.rating_votes,
        trailer: data.trailer.link,
        cast: data.cast,
      }
    },
  },
  Mutation: {
    changeTags: async (parent, args, context, info) => {
      const { tags, id } = args
      const { data } = await movieService({
        method: 'patch',
        url: '/movies/' + id,
        data: {
          tags,
        },
      })

      return data
    },
    addMovie: async (parent, args, context, info) => {
      try {
        const { title, imdbId, overview, poster_path, tags, popularity } = args
        const { data } = await movieService({
          method: 'post',
          url: '/movies',
          data: {
            title,
            imdbId,
            overview,
            poster_path,
            tags,
            popularity,
          },
        })
        return data
      } catch (error) {
        return err
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { id } = args
        const { data } = await movieService({
          method: 'delete',
          url: '/movies/' + id,
        })
        return 'Success'
      } catch (error) {
        return 'Failed'
      }
    },
    updateMovie: async (parent, args) => {
      try {
        const { id, title, imdbId, overview, poster_path, tags, popularity } = args
        const { data } = await movieService({
          method: 'put',
          url: '/movies/' + id,
          data: {
            title,
            imdbId,
            overview,
            poster_path,
            tags,
            popularity,
          },
        })
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
}

module.exports = { movieTypeDefs, movieResolvers }

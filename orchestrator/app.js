const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')

const { movieTypeDefs, movieResolvers } = require('./resources/Movies')

const rootTypeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, movieTypeDefs],
  resolvers: [movieResolvers],
})

const server = new ApolloServer({
  schema: schema,
})

server.listen().then(({ url }) => {
  console.log('Orchestrator server ready at ' + url)
})

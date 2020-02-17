const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const { movieType, movieResolver } = require('./Types/Movie');
const { tvSeriesType, tvSeriesResolver } = require('./Types/TvSeries');

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, movieType, tvSeriesType],
  resolvers: [movieResolver, tvSeriesResolver],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Apollo Server listening on ${url}`);
});

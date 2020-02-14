const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const { movieDefs, moviesResolver } = require("./Types/Movie");
const { tvSeriesDefs, tvSeriesResolver } = require("./Types/TvSeries");

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, tvSeriesDefs, movieDefs],
  resolvers: [tvSeriesResolver, moviesResolver]
});
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log("Apollo Server running on ( ͡° ͜ʖ ͡°)" + url);
});

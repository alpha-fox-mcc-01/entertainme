const PORT = process.env.PORT || 3000;
// var Redis = require("ioredis");
// var redis = new Redis();
const movieInstance = require("./apis/movieInstance");
const tvseriesInstance = require("./apis/tvseriesInstance");

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`

 type Movie {
   title: String
   overview: String
   poster_path: String
   popularity: Int
   tags: [String]
 }

 type TVSeries {
  title: String
  overview: String
  poster_path: String
  popularity: Int
  tags: [String]
}
 type Query {
   movies: [Movie],
   tvseries: [TVSeries]
 }

 type Mutation {
   addMovies(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]): Movie
 }

 
`;

const resolvers = {
  Query: {
    movies: async () => {
      const { data } = await movieInstance.get("movies");
      return data;
    }
  },
  Mutation: {
    addMovies: async (parent, args) => {
      const { data : { result } } = await movieInstance.post("movies", {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      });
      return result;
    }
  }
};

// app.get("/entertainme", (req, res) => {
//   const promiseArray = [
//     movieInstance.get("movies"),
//     tvseriesInstance.get("tv")
//   ];

//   redis.get("entertainme", (err, result) => {
//     if (result) {
//       console.log('dari redis')
//       res.status(200).json(JSON.parse(result));
//     } else {
//       console.log('dari else')
//       Promise.all(promiseArray)
//         .then(result => {
//           redis.set(
//             "entertainme",
//             JSON.stringify({
//               movies: result[0].data.movies,
//               tvSeries: result[1].data.tvSeries
//             })
//           );
//           res.status(200).json({
//             movies: result[0].data.movies,
//             tvSeries: result[1].data.tvSeries
//           });
//         })
//         .catch(err => {
//           res.status(500).json(err);
//         });
//     }
//   });
// });

// app.post('/movies', (req, res) => {
//   const { title, overview, poster_path, popularity, tags } = req.body
//   movieInstance.post("movies", {  title, overview, poster_path, popularity, tags })
//                .then(({data}) => {
//                  res.status(200).json({msg: 'Movie successfully added!'})
//                  redis.del("entertainme");
//                })
//                .catch(err => {
//                  res.status(500).json({error: err})
//                })
// })

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

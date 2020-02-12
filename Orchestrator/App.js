const express = require("express");
const app = express();
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
var Redis = require("ioredis");
var redis = new Redis();
const movieInstance = require("./apis/movieInstance");
const tvseriesInstance = require("./apis/tvseriesInstance");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.get("/entertainme", (req, res) => {
  const promiseArray = [
    movieInstance.get("movies"),
    tvseriesInstance.get("tv")
  ];

  redis.get("entertainme", (err, result) => {
    if (result) {
      console.log('dari redis')
      res.status(200).json(JSON.parse(result));
    } else {
      console.log('dari else')
      Promise.all(promiseArray)
        .then(result => {
          redis.set(
            "entertainme",
            JSON.stringify({
              movies: result[0].data.movies,
              tvSeries: result[1].data.tvSeries
            })
          );
          res.status(200).json({
            movies: result[0].data.movies,
            tvSeries: result[1].data.tvSeries
          });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  });
});


app.post('/movies', (req, res) => {
  const { title, overview, poster_path, popularity, tags } = req.body
  movieInstance.post("movies", {  title, overview, poster_path, popularity, tags })
               .then(({data}) => {
                 res.status(200).json({msg: 'Movie successfully added!'})
                 redis.del("entertainme");
               })
               .catch(err => {
                 res.status(500).json({error: err})
               })
})

app.listen(PORT, () => {
  console.log("app running on port", PORT);
});

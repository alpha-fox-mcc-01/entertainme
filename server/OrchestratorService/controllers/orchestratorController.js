const Redis = require("ioredis");
const redis = new Redis();

const moviesInstance = require("../axiosInstances/moviesInstance");
const tvInstance = require("../axiosInstances/tvSeriesInstance");

module.exports = {
  getMovieSeries(req, res, next) {
    let allData = {};
    redis
      .get("moviesTvSeries")
      .then(data => {
        if (data) {
          allData = JSON.parse(data);
          res.status(200).json(allData);
        } else {
          moviesInstance({
            method: "GET"
          })
            .then(({ data }) => {
              allData.movies = data;
              return tvInstance({
                method: "GET"
              });
            })
            .then(({ data }) => {
              allData.tvSeries = data;
              redis.set("moviesTvSeries", JSON.stringify(allData), "EX", "300");
              res.status(200).json(allData);
            })
            .catch(next);
        }
      })
      .catch(next);
  },
  addMovie(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    redis.del("moviesTvSeries");
    moviesInstance({
      method: "POST",
      data: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      }
    })
      .then(({ data }) => {
        res.status(201).json(data);
      })
      .catch(next);
  },
  editMovie(req, res, next) {
    redis.del("moviesTvSeries");
    let { title, overview, poster_path, popularity, tags } = req.body;
    moviesInstance({
      method: "POST",
      data: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      },
      params: {
        id: req.params.id
      }
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  deleteMovie(req, res, next) {
    redis.del("moviesTvSeries");
    moviesInstance({
      method: "DELETE",
      params: {
        id: req.params.id
      }
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  addTvSeries(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    tvInstance({
      method: "POST",
      data: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      }
    })
      .then(({ data }) => {
        res.status(201).json(data);
      })
      .catch(next);
  },
  editTvSeries(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    tvInstance({
      method: "POST",
      data: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      },
      params: {
        id: req.params.id
      }
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  deleteTvSeries(req, res, next) {
    tvInstance({
      method: "DELETE",
      params: {
        id: req.params.id
      }
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
};

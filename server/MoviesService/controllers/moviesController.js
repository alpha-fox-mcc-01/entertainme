const Movie = require("../models/Movie");

module.exports = {
  fetchMovies(req, res, next) {
    Movie.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  addMovie(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    Movie.create({
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  editMovie(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        overview,
        poster_path,
        popularity,
        tags
      },
      { new: true }
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  deleteMovie(req, res, next) {
    Movie.findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
};

const Movie = require('../models/Movie');

class MovieController {
  static fetchAllMovies(req, res, next) {
    Movie.find()
      .sort({ createdAt: -1 })
      .then(movie => {
        res.status(200).json(movie);
      })
      .catch(console.log);
  }

  static fetchFiveMovies(req, res, next) {
    Movie.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .then(movie => {
        res.status(200).json(movie);
      })
      .catch(console.log);
  }

  static addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.create({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then(movie => {
        res.status(201).json(movie);
      })
      .catch(console.log);
  }

  static editMovie(req, res, next) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.findByIdAndUpdate(
      id,
      {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
      { new: true }
    )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(console.log);
  }

  static deleteMovie(req, res, next) {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          message: 'Movie deleted successfully',
        });
      })
      .catch(console.log);
  }
}

module.exports = MovieController;

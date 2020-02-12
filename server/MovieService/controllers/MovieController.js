const Movie = require('../models/Movie');

class MovieController {
  static fetchAllMovies(req, res, next) {
    Movie.find()
      .then(movie => {
        res.status(200).json(movie);
      })
      .catch(next);
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
      .catch(next);
  }

  static editMovie(req, res, next) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.findByIdAndUpdate(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then(() => {
        res.status(201).json({
          message: 'Movie updated successfully',
        });
      })
      .catch(next);
  }

  static deleteMovie(req, res, next) {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          message: 'Movie deleted successfully',
        });
      })
      .catch(next);
  }
}

module.exports = MovieController;

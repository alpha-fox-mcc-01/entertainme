const Movie = require("../models/movies");

class MovieController {
  static createMovie(req, res, next) {
    console.log(req.body)
    const { title, overview, poster_path, popularity, tags } = req.body;

    Movie.create({
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then( result => {
          console.log(result)
        res.status(201).json({ result });
      })
      .catch(err => {
        next(err);
      });
  }

  static getAllMovies(req, res, next) {
      Movie.find()
           .then(result => {
               res.status(200).json(result)
           })
           .catch(err => {
               next(err)
           })
  }


}

module.exports = MovieController
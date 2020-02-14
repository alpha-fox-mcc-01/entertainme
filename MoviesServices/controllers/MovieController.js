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

  static editMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.findOneAndUpdate({ _id: req.params.id}, {  title, overview, poster_path, popularity, tags}) 
         .then(_ => {
           res.status(200).json({ result: req.body})
         }) 
         .catch(err => {
           next(err)
         })
  }

  static deleteMovie(req, res, next) {
    Movie.deleteOne({ _id: req.params.id})
         .then(_ => {
           res.status(200).json({ result: req.params.id })
         })
         .catch(err => {
           next(err)
         })
  }


}

module.exports = MovieController
const Movie = require('../models/Movie')
class MoviesController {
  static getAll(req, res) {
    Movie.find()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(console.log)
  }
  static getOne(req, res) {
    const { id } = req.params
    Movie.findOne({ _id: id }).then((result) => {
      res.status(200).json(result)
    })
  }
  static newMovie(req, res) {
    const { imdbId, title, overview, poster_path, tags } = req.body
    let tagsArr = []
    let trimmed
    if (tags) {
      tagsArr = tags.split(',')
      trimmed = tagsArr.map((tag) => tag.trim())
    }
    const popularity = parseFloat(req.body.popularity)
    Movie.create({
      imdbId,
      title,
      overview,
      poster_path,
      popularity,
      tags: trimmed,
    })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(console.log)
  }
  static update(req, res) {
    const { title, overview, poster_path, tags } = req.body
    const { id } = req.params
    let tagsArr = []
    if (tags) {
      tagsArr = tags.split(',')
    }
    let popularity = req.body.popularity
    popularity = parseFloat(req.body.popularity)
    const updateValue = {
      title,
      overview,
      poster_path,
      popularity,
      tags: tagsArr,
    }

    Movie.findOneAndUpdate({ _id: id }, updateValue, { new: true })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(console.log)
  }

  static changeTags(req, res) {
    const { tags } = req.body
    const { id } = req.params

    if (tags.length >= 1) {
      let tagsArr = []
      if (tags) {
        tagsArr = tags.split(',')
      }
      const updateValue = {
        tags: tagsArr,
      }

      Movie.findOneAndUpdate({ _id: id }, updateValue, { new: true })
        .then((result) => {
          res.status(200).json(result)
        })
        .catch(console.log)
    } else {
      res.status(204).json({})
    }
  }
  static delete(req, res) {
    const { id } = req.params
    Movie.deleteOne({ _id: id })
      .then((result) => {
        res.status(204).json({})
      })
      .catch(console.log)
  }
}

module.exports = MoviesController

const TVSeries = require('../models/TVSeries')
class TVSeriesController {
  static getAll(req, res, next) {
    TVSeries.find()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    const { id } = req.params
    TVSeries.findOne({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static newTVSeries(req, res, next) {
    const { title, overview, poster_path, tags } = req.body
    let tagsArr = []
    if (tags) {
      tagsArr = tags.split(',')
    }
    const popularity = parseFloat(req.body.popularity)
    TVSeries.create({
      title,
      overview,
      poster_path,
      popularity,
      tags: tagsArr,
    })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static update(req, res, next) {
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
    TVSeries.findOneAndUpdate({ _id: id }, updateValue, { new: true })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params
    TVSeries.deleteOne({ _id: id })
      .then((result) => {
        res.status(204).json({ result })
      })
      .catch(next)
  }
}

module.exports = TVSeriesController

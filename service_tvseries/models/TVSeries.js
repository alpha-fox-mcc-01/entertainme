const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSeries = new Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: [],
})

module.exports = mongoose.model('TvSeries', tvSeries)

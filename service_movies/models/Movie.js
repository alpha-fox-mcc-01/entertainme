const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  imdbId: String,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: [],
})

module.exports = mongoose.model('Movie', movieSchema)

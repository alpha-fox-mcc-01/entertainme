const { Schema, model } = require('mongoose')


const tvseriesSchema = new Schema({
    title: String,
    overview: String, 
    poster_path: String, 
    popularity: Number,
    tags: Array
})


const TvSeries = model('TvSeries', tvseriesSchema)

module.exports = TvSeries
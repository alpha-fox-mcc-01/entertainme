const { Schema, model } = require('mongoose');

const tvSeriesSchema = new Schema(
  {
    title: String,
    overview: String,
    poster_path: String,
    popularity: Number,
    tags: Array,
  },
  { timestamps: true }
);

const TvSeries = model('TvSeries', tvSeriesSchema);
module.exports = TvSeries;

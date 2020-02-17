const { model, Schema } = require("mongoose");

const seriesSchema = new Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tags: Array
});

const Series = model("Series", seriesSchema);
module.exports = Series;

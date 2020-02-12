const TvSeries = require('../models/TvSeries');

class TvSeriesController {
  static fetchAllTvSeries(req, res, next) {
    TvSeries.find()
      .then(tvSeries => {
        res.status(200).json(tvSeries);
      })
      .catch(next);
  }

  static addTvSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    TvSeries.create({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then(tvSeries => {
        res.status(201).json(tvSeries);
      })
      .catch(next);
  }

  static editTvSeries(req, res, next) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    TvSeries.findByIdAndUpdate(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then(() => {
        res.status(201).json({
          message: 'Tv Series updated successfully',
        });
      })
      .catch(next);
  }

  static deleteTvSeries(req, res, next) {
    const { id } = req.params;
    TvSeries.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          message: 'Tv Series deleted successfully',
        });
      })
      .catch(next);
  }
}

module.exports = TvSeriesController;

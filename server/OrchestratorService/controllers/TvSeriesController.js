const tvSeriesAxios = require('../api/tvSeriesAxios');
const Redis = require('ioredis');
const redis = new Redis();

class TvSeriesController {
  static addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    tvSeriesAxios
      .post('/', { title, overview, poster_path, popularity, tags })
      .then(({ data }) => {
        redis.del('getData');
        res.status(201).json(data);
      })
      .catch(console.log);
  }

  static editTvSeries(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    tvSeriesAxios
      .put('/' + id, { title, overview, poster_path, popularity, tags })
      .then(({ data }) => {
        redis.del('getData');
        res.status(201).json({
          message: 'Tv Series updated successfully',
        });
      })
      .catch(console.log);
  }

  static deleteTvSeries(req, res) {
    const { id } = req.params;
    tvSeriesAxios
      .delete('/' + id)
      .then(({ data }) => {
        redis.del('getData');
        res.status(200).json({
          message: 'Tv Series deleted successfully',
        });
      })
      .catch(console.log);
  }
}

module.exports = TvSeriesController;

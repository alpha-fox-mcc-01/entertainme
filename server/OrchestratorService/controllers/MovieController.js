const movieAxios = require('../api/movieAxios');
const Redis = require('ioredis');
const redis = new Redis();

class MovieController {
  static addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    movieAxios
      .post('/', { title, overview, poster_path, popularity, tags })
      .then(({ data }) => {
        redis.del('getData');
        res.status(201).json(data);
      })
      .catch(console.log);
  }

  static editMovie(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    movieAxios
      .put('/' + id, { title, overview, poster_path, popularity, tags })
      .then(({ data }) => {
        redis.del('getData');
        res.status(201).json({
          message: 'Movie updated successfully',
        });
      })
      .catch(console.log);
  }

  static deleteMovie(req, res) {
    const { id } = req.params;
    movieAxios
      .delete('/' + id)
      .then(({ data }) => {
        redis.del('getData');
        res.status(200).json({
          message: 'Movie deleted successfully',
        });
      })
      .catch(console.log);
  }
}

module.exports = MovieController;

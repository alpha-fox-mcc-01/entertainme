const movieAxios = require('../api/movieAxios');
const tvSeriesAxios = require('../api/tvSeriesAxios');
const express = require('express');
const router = express.Router();
const Redis = require('ioredis');
const redis = new Redis();

router.get('/', (req, res) => {
  redis.get('getData', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = JSON.parse(result);
      console.log(result);
      if (result) {
        res.status(200).json(result);
      } else {
        const allData = {};
        Promise.all([movieAxios.get('/'), tvSeriesAxios.get('/')])
          .then(response => {
            response.map(item => {
              if (item.request.path === '/movies/') {
                allData.movies = item.data;
              } else if (item.request.path === '/tv/') {
                allData.tvSeries = item.data;
              }
            });
            redis.set('getData', JSON.stringify(allData));
            res.status(200).json(allData);
          })
          .catch(console.log);
      }
    }
  });
});

module.exports = router;

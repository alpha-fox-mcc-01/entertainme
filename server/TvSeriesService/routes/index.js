const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.fetchAllTvSeries);
router.post('/', TvSeriesController.addTvSeries);
router.put('/:id', TvSeriesController.editTvSeries);
router.delete('/:id', TvSeriesController.deleteTvSeries);

module.exports = router;

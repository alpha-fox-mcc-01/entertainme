const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.post('/', TvSeriesController.addTvSeries);
router.put('/:id', TvSeriesController.editTvSeries);
router.delete('/:id', TvSeriesController.deleteTvSeries);

module.exports = router;

const express = require('express');
const router = express.Router();
const entertainmeRouter = require('./entertainme');
const movieRouter = require('./movies');
const tvSeriesRouter = require('./tvSeries');

router.use('/entertainme', entertainmeRouter);
router.use('/movies', movieRouter);
router.use('/tv', tvSeriesRouter);

module.exports = router;

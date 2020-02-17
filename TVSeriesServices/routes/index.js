const express = require('express')
const router = express.Router()
const TVSeriesController = require('../controllers/TVSeriesController')


router.post('/tv', TVSeriesController.createSeries)
router.get('/tv', TVSeriesController.getAllSeries)
router.put('/tv/:id', TVSeriesController.editSeries)
router.delete('/tv/:id', TVSeriesController.deleteSeries)

module.exports = router
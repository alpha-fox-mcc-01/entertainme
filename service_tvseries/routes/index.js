const Router = require('express').Router()

const tvSeriesController = require('../controllers/tvSeriesController')

Router.get('/tv', tvSeriesController.getAll)
Router.post('/tv', tvSeriesController.newTVSeries)
Router.get('/tv/:id', tvSeriesController.getOne)
Router.delete('/tv/:id', tvSeriesController.delete)
Router.put('/tv/:id', tvSeriesController.update)

module.exports = Router

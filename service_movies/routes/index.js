const Router = require('express').Router()

const moviesController = require('../controllers/moviesController')

Router.post('/movies', moviesController.newMovie)
Router.get('/movies', moviesController.getAll)
Router.delete('/movies/:id', moviesController.delete)
Router.get('/movies/:id', moviesController.getOne)
Router.put('/movies/:id', moviesController.update)
Router.patch('/movies/:id', moviesController.changeTags)

module.exports = Router

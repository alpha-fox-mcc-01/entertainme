const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')


router.post('/movies', MovieController.createMovie)
router.get('/movies', MovieController.getAllMovies)


module.exports = router
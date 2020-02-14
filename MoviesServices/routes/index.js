const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')


router.post('/movies', MovieController.createMovie)
router.get('/movies', MovieController.getAllMovies)
router.put('/movies/:id', MovieController.editMovie)
router.delete('/movies/:id', MovieController.deleteMovie)
module.exports = router
const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

router.post('/', MovieController.addMovie);
router.put('/:id', MovieController.editMovie);
router.delete('/:id', MovieController.deleteMovie);

module.exports = router;

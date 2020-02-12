const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.fetchMovies);

router.post("/", moviesController.addMovie);

router.put("/:id", moviesController.editMovie);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;

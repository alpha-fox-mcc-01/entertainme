const express = require("express");
const router = express.Router();

const moviesRoute = require("./moviesRoute");
const tvSeriesRoute = require("./tvSeriesRoute");

const orchestratorController = require("../controllers/orchestratorController");

router.get("/entertainme", orchestratorController.getMovieSeries);

router.use("/movies", moviesRoute);

router.use("/tv", tvSeriesRoute);
module.exports = router;

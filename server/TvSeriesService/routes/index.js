const express = require("express");
const router = express.Router();
const seriesController = require("../controllers/seriesController");

router.get("/", seriesController.fetchSeries);

router.post("/", seriesController.addSeries);

router.put("/:id", seriesController.editSeries);

router.delete("/:id", seriesController.deleteSeries);

module.exports = router;

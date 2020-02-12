const express = require("express");
const router = express.Router();
const orchestratorController = require("../controllers/orchestratorController");

router.post("/", orchestratorController.addTvSeries);

router.put("/:id", orchestratorController.editTvSeries);

router.delete("/:id", orchestratorController.deleteTvSeries);

module.exports = router;

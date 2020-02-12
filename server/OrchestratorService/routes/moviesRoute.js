const express = require("express");
const router = express.Router();
const orchestratorController = require("../controllers/orchestratorController");

router.post("/", orchestratorController.addMovie);

router.put("/:id", orchestratorController.editMovie);

router.delete("/:id", orchestratorController.deleteMovie);

module.exports = router;

/*
    File: tournamentsRoutes.js
    Description: Defines tournament related routes including registration.
*/

const express = require("express");
const router = express.Router();

const controller = require("../controllers/tournamentsController");

/* Get tournaments */
router.get("/", controller.getTournaments);

/* Create tournament */
router.post("/", controller.createTournament);

/* Update tournament */
router.put("/:id", controller.updateTournament);

/* Register user to tournament */
router.post("/register", controller.registerTournament);

/* Disable / finish tournament */
router.put("/:id/status", controller.updateTournamentStatus);

module.exports = router;
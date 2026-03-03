const express = require('express');
const router = express.Router();
const tournamentsController = require('../controllers/tournamentsController');

router.get('/', tournamentsController.getTournaments);

router.post('/', tournamentsController.createTournament);

router.put("/tournaments/:id", tournamentsController.updateTournament);

module.exports = router;
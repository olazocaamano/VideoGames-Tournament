const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.get('/', gamesController.getGames);

router.post('/', gamesController.createGame);

module.exports = router;
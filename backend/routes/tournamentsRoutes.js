const express = require('express');
const router = express.Router();
const tournamentsController = require('../controllers/tournamentsController');

router.get('/', tournamentsController.getTournaments);

module.exports = router;
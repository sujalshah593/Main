const express = require('express');
const router = express.Router();
const flywheelController = require('../controllers/flywheelController');

router.post('/', flywheelController.saveAttempt);
router.get('/', flywheelController.getAttempts);

module.exports = router;

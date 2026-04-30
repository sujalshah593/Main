const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

router.post('/', measurementController.saveAttempt);
router.get('/', measurementController.getAttempts);

module.exports = router;

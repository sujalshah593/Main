const express = require('express');
const router = express.Router();
const motionController = require('../controllers/motionController');

router.post('/', motionController.saveAttempt);
router.get('/', motionController.getAttempts);

module.exports = router;

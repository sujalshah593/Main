const express = require('express');
const router = express.Router();
const inclinedFrictionController = require('../controllers/inclinedFrictionController');

router.post('/', inclinedFrictionController.saveAttempt);
router.get('/', inclinedFrictionController.getAttempts);

module.exports = router;

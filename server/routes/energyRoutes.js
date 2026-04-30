const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energyController');

router.post('/save', energyController.saveEnergyAttempt);
router.get('/history', energyController.getEnergyAttempts);

module.exports = router;

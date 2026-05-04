const express = require('express');
const router = express.Router();
const complexNumberController = require('../controllers/complexNumberController');

router.post('/save', complexNumberController.saveAttempt);
router.get('/history', complexNumberController.getHistory);
router.post('/calculate', complexNumberController.calculate);

module.exports = router;

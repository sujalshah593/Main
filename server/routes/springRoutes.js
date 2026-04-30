const express = require('express');
const router = express.Router();
const springController = require('../controllers/springController');

router.post('/save', springController.saveSpringAttempt);
router.get('/history', springController.getSpringAttempts);

module.exports = router;

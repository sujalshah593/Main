const express = require('express');
const router = express.Router();
const pendulumController = require('../controllers/pendulumController');

router.post('/', pendulumController.saveAttempt);
router.get('/', pendulumController.getAttempts);

module.exports = router;

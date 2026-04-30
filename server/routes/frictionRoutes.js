const express = require('express');
const router = express.Router();
const frictionController = require('../controllers/frictionController');

router.post('/', frictionController.saveAttempt);
router.get('/', frictionController.getAttempts);

module.exports = router;

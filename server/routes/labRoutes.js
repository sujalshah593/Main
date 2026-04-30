const express = require('express');
const { getLabs } = require('../controllers/labController');

const router = express.Router();
router.get('/', getLabs);

module.exports = router;

const express = require('express');
const { getExperimentsByLab } = require('../controllers/experimentController');

const router = express.Router();
router.get('/:labId', getExperimentsByLab);

module.exports = router;

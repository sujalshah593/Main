const express = require('express');
const { getExperimentById } = require('../controllers/experimentController');

const router = express.Router();
router.get('/:id', getExperimentById);

module.exports = router;

const Experiment = require('../models/Experiment');
const mongoose = require('mongoose');

async function getExperimentsByLab(req, res) {
  try {
    const { labId } = req.params;
    if (!mongoose.isValidObjectId(labId)) {
      return res.status(400).json({ message: 'Invalid lab id' });
    }
    const experiments = await Experiment.find({ labId })
      .select('title labId createdAt')
      .sort({ title: 1 })
      .lean();
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch experiments', error: err.message });
  }
}

async function getExperimentById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid experiment id' });
    }
    const experiment = await Experiment.findById(id).populate('labId', 'name description').lean();
    if (!experiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    res.json(experiment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch experiment', error: err.message });
  }
}

module.exports = { getExperimentsByLab, getExperimentById };

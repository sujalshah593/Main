const Feedback = require('../models/Feedback');
const Experiment = require('../models/Experiment');
const mongoose = require('mongoose');

async function createFeedback(req, res) {
  try {
    const { experimentId, message, rating } = req.body;
    if (!experimentId || !message || rating === undefined) {
      return res.status(400).json({ message: 'experimentId, message, and rating are required' });
    }
    if (!mongoose.isValidObjectId(experimentId)) {
      return res.status(400).json({ message: 'Invalid experiment id' });
    }
    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: 'rating must be a number between 1 and 5' });
    }
    const exists = await Experiment.exists({ _id: experimentId });
    if (!exists) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    const doc = await Feedback.create({ experimentId, message: String(message).trim(), rating: r });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save feedback', error: err.message });
  }
}

module.exports = { createFeedback };

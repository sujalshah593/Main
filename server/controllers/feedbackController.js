const Feedback = require('../models/Feedback');
const Experiment = require('../models/Experiment');
const mongoose = require('mongoose');
const { sendFeedbackEmail } = require('../services/emailService');

async function createFeedback(req, res) {
  try {
    const { experimentId, experimentTitle, message, rating } = req.body;
    if ((!experimentId && !experimentTitle) || !message || rating === undefined) {
      return res.status(400).json({ message: 'experimentId or experimentTitle, message, and rating are required' });
    }
    
    let validExperimentId = null;
    if (experimentId && mongoose.isValidObjectId(experimentId)) {
      const exists = await Experiment.exists({ _id: experimentId });
      if (exists) {
        validExperimentId = experimentId;
      }
    }

    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: 'rating must be a number between 1 and 5' });
    }

    const doc = await Feedback.create({ 
      experimentId: validExperimentId, 
      experimentTitle: experimentTitle || null,
      message: String(message).trim(), 
      rating: r 
    });

    // Send email notification
    try {
      await sendFeedbackEmail({
        experimentTitle: experimentTitle || 'General Feedback',
        message: String(message).trim(),
        rating: r
      });
    } catch (emailError) {
      console.error('Failed to send feedback email:', emailError);
    }

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save feedback', error: err.message });
  }
}

module.exports = { createFeedback };

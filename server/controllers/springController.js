const SpringAttempt = require('../models/SpringAttempt');

exports.saveSpringAttempt = async (req, res) => {
  try {
    const newAttempt = new SpringAttempt(req.body);
    await newAttempt.save();
    res.status(201).json(newAttempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSpringAttempts = async (req, res) => {
  try {
    const attempts = await SpringAttempt.find().sort({ timestamp: -1 });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

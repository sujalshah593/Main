const EnergyAttempt = require('../models/EnergyAttempt');

exports.saveEnergyAttempt = async (req, res) => {
  try {
    const newAttempt = new EnergyAttempt(req.body);
    await newAttempt.save();
    res.status(201).json(newAttempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEnergyAttempts = async (req, res) => {
  try {
    const attempts = await EnergyAttempt.find().sort({ timestamp: -1 });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const PendulumAttempt = require('../models/PendulumAttempt');

exports.saveAttempt = async (req, res) => {
  try {
    const {
      oscillationsN,
      errorsApplied,
      trials,
      calculatedGravity
    } = req.body;

    const newAttempt = new PendulumAttempt({
      oscillationsN,
      errorsApplied,
      trials,
      calculatedGravity
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Pendulum attempt saved successfully'
    });
  } catch (error) {
    console.error('Error saving pendulum attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save pendulum attempt',
      error: error.message
    });
  }
};

exports.getAttempts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const attempts = await PendulumAttempt.find().sort({ createdAt: -1 }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    console.error('Error fetching pendulum attempts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pendulum attempts',
      error: error.message
    });
  }
};

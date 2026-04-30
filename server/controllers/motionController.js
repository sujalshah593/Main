const MotionAttempt = require('../models/MotionAttempt');

exports.saveAttempt = async (req, res) => {
  try {
    const {
      initialVelocity,
      acceleration,
      errorsApplied,
      dataPoints,
      calculatedSlope,
      calculatedArea
    } = req.body;

    const newAttempt = new MotionAttempt({
      initialVelocity,
      acceleration,
      errorsApplied,
      dataPoints,
      calculatedSlope,
      calculatedArea
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Motion attempt saved successfully'
    });
  } catch (error) {
    console.error('Error saving motion attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save motion attempt',
      error: error.message
    });
  }
};

exports.getAttempts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const attempts = await MotionAttempt.find().sort({ createdAt: -1 }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    console.error('Error fetching motion attempts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch motion attempts',
      error: error.message
    });
  }
};

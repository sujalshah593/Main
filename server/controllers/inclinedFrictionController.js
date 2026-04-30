const InclinedFrictionAttempt = require('../models/InclinedFrictionAttempt');

/**
 * Save a new inclined friction experiment attempt
 * @route POST /api/inclined-friction
 */
exports.saveAttempt = async (req, res) => {
  try {
    const { trials, averageMu, appliedErrors, quizResults } = req.body;

    const newAttempt = new InclinedFrictionAttempt({
      trials,
      averageMu,
      appliedErrors,
      quizResults
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Inclined friction experiment data saved successfully'
    });
  } catch (error) {
    console.error('Error saving inclined friction attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save experiment data',
      error: error.message
    });
  }
};

/**
 * Get experiment history
 * @route GET /api/inclined-friction
 */
exports.getAttempts = async (req, res) => {
  try {
    const attempts = await InclinedFrictionAttempt.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: error.message
    });
  }
};

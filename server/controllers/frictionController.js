const FrictionAttempt = require('../models/FrictionAttempt');

/**
 * Save a new friction experiment attempt
 * @route POST /api/friction
 */
exports.saveAttempt = async (req, res) => {
  try {
    const { trials, averageMu, appliedErrors, quizResults } = req.body;

    const newAttempt = new FrictionAttempt({
      trials,
      averageMu,
      appliedErrors,
      quizResults
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Friction experiment data saved successfully'
    });
  } catch (error) {
    console.error('Error saving friction attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save friction attempt',
      error: error.message
    });
  }
};

/**
 * Get friction experiment history
 * @route GET /api/friction
 */
exports.getAttempts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const attempts = await FrictionAttempt.find().sort({ createdAt: -1 }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    console.error('Error fetching friction attempts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch friction attempts',
      error: error.message
    });
  }
};

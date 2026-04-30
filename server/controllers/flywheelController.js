const FlywheelAttempt = require('../models/FlywheelAttempt');

/**
 * Save a new flywheel experiment attempt
 * @route POST /api/flywheel
 */
exports.saveAttempt = async (req, res) => {
  try {
    const { trials, averageI, appliedErrors, quizResults } = req.body;

    const newAttempt = new FlywheelAttempt({
      trials,
      averageI,
      appliedErrors,
      quizResults
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Flywheel experiment data saved successfully'
    });
  } catch (error) {
    console.error('Error saving flywheel attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save flywheel attempt',
      error: error.message
    });
  }
};

/**
 * Get flywheel experiment history
 * @route GET /api/flywheel
 */
exports.getAttempts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const attempts = await FlywheelAttempt.find().sort({ createdAt: -1 }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    console.error('Error fetching flywheel attempts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch flywheel attempts',
      error: error.message
    });
  }
};

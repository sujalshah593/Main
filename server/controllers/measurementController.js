const MeasurementAttempt = require('../models/MeasurementAttempt');

/**
 * Save a new measurement attempt
 * @route POST /api/measurements
 */
exports.saveAttempt = async (req, res) => {
  try {
    const {
      experimentType,
      instrumentUsed,
      errorsApplied,
      systematicErrorValue,
      trials,
      calculatedResults,
      sigFigQuizResults
    } = req.body;

    const newAttempt = new MeasurementAttempt({
      experimentType,
      instrumentUsed,
      errorsApplied,
      systematicErrorValue,
      trials,
      calculatedResults,
      sigFigQuizResults
    });

    const savedAttempt = await newAttempt.save();
    
    res.status(201).json({
      success: true,
      data: savedAttempt,
      message: 'Measurement attempt saved successfully'
    });
  } catch (error) {
    console.error('Error saving measurement attempt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save measurement attempt',
      error: error.message
    });
  }
};

/**
 * Get all measurement attempts (can be filtered by user later if auth is added)
 * @route GET /api/measurements
 */
exports.getAttempts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const attempts = await MeasurementAttempt.find().sort({ createdAt: -1 }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    console.error('Error fetching measurement attempts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch measurement attempts',
      error: error.message
    });
  }
};

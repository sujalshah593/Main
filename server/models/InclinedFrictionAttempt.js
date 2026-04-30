const mongoose = require('mongoose');

const inclinedTrialSchema = new mongoose.Schema({
  trialNumber: { type: Number, required: true },
  surfaceType: { type: String, required: true },
  angleDegrees: { type: Number, required: true },
  angleRadians: { type: Number, required: true },
  calculatedMu: { type: Number, required: true },
  mass: { type: Number, default: 1.0 }
}, { _id: false });

const inclinedFrictionAttemptSchema = new mongoose.Schema({
  trials: [inclinedTrialSchema],
  averageMu: { type: Number },
  appliedErrors: {
    motionDetectionDelay: { type: Boolean, default: true },
    measurementUncertainty: { type: Boolean, default: false }
  },
  quizResults: [{
    question: String,
    userAnswer: String,
    isCorrect: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('InclinedFrictionAttempt', inclinedFrictionAttemptSchema);

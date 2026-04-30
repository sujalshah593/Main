const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
  trialNumber: { type: Number, required: true },
  measuredValue: { type: Number, required: true },
  error: { type: Number, required: true, default: 0 },
  correctedValue: { type: Number, required: true }
}, { _id: false });

const sigFigQuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const measurementAttemptSchema = new mongoose.Schema({
  experimentType: { type: String, required: true, enum: ['length_rod', 'diameter_sphere', 'thickness_wire', 'other'], default: 'length_rod' },
  instrumentUsed: { type: String, required: true, enum: ['ruler', 'vernier', 'screw_gauge'], default: 'ruler' },
  errorsApplied: {
    systematic: { type: Boolean, default: false },
    random: { type: Boolean, default: false },
    human: { type: Boolean, default: false }
  },
  systematicErrorValue: { type: Number, default: 0 },
  trials: [trialSchema],
  calculatedResults: {
    mean: { type: Number },
    absoluteError: { type: Number },
    relativeError: { type: Number },
    percentageError: { type: Number },
    finalResultWithSigFigs: { type: String }
  },
  sigFigQuizResults: [sigFigQuizSchema]
}, { timestamps: true });

module.exports = mongoose.model('MeasurementAttempt', measurementAttemptSchema);

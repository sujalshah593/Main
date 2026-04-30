const mongoose = require('mongoose');

const frictionTrialSchema = new mongoose.Schema({
  trialNumber: { type: Number, required: true },
  surfaceType: { type: String, required: true },
  mass: { type: Number, required: true }, // kg
  normalReaction: { type: Number, required: true }, // N
  appliedForce: { type: Number, required: true }, // N (at point of motion)
  staticFriction: { type: Number },
  kineticFriction: { type: Number },
  calculatedMuStatic: { type: Number },
  calculatedMuKinetic: { type: Number }
}, { _id: false });

const frictionAttemptSchema = new mongoose.Schema({
  trials: [frictionTrialSchema],
  averageMu: {
    static: Number,
    kinetic: Number
  },
  appliedErrors: {
    surfaceIrregularity: { type: Boolean, default: true },
    measurementUncertainty: { type: Boolean, default: false }
  },
  quizResults: [{
    question: String,
    userAnswer: String,
    isCorrect: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('FrictionAttempt', frictionAttemptSchema);

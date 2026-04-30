const mongoose = require('mongoose');

const pendulumTrialSchema = new mongoose.Schema({
  trialNumber: { type: Number, required: true },
  length: { type: Number, required: true },
  timeForN: { type: Number, required: true },
  timePeriod: { type: Number, required: true },
  tSquared: { type: Number, required: true }
}, { _id: false });

const pendulumAttemptSchema = new mongoose.Schema({
  oscillationsN: { type: Number, required: true, default: 10 },
  errorsApplied: {
    reactionTime: { type: Boolean, default: false },
    airResistance: { type: Boolean, default: false }
  },
  trials: [pendulumTrialSchema],
  calculatedGravity: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('PendulumAttempt', pendulumAttemptSchema);

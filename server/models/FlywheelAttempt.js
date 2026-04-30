const mongoose = require('mongoose');

const flywheelTrialSchema = new mongoose.Schema({
  trialNumber: { type: Number, required: true },
  massAttached: { type: Number, required: true }, // kg
  axleRadius: { type: Number, required: true }, // m
  numTurns: { type: Number, required: true }, // N (number of turns of string)
  heightFalling: { type: Number, required: true }, // h = 2 * pi * r * N
  timeFalling: { type: Number, required: true }, // t1 (s)
  rotationsFalling: { type: Number, required: true }, // n1 (usually same as N)
  timeStopping: { type: Number, required: true }, // t2 (s)
  rotationsStopping: { type: Number, required: true }, // n2
  calculatedAngularVelocity: { type: Number }, // omega (rad/s)
  calculatedI: { type: Number } // Moment of Inertia (kg.m^2)
}, { _id: false });

const flywheelAttemptSchema = new mongoose.Schema({
  trials: [flywheelTrialSchema],
  averageI: { type: Number },
  appliedErrors: {
    friction: { type: Boolean, default: true },
    airResistance: { type: Boolean, default: false },
    humanDelay: { type: Boolean, default: false }
  },
  quizResults: [{
    question: String,
    userAnswer: String,
    isCorrect: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('FlywheelAttempt', flywheelAttemptSchema);

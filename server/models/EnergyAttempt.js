const mongoose = require('mongoose');

const energyAttemptSchema = new mongoose.Schema({
  initialHeight: { type: Number, required: true },
  isFrictionEnabled: { type: Boolean, default: false },
  mass: { type: Number, default: 1 }, // kg
  readings: [{
    position: Number,
    height: Number,
    velocity: Number,
    potentialEnergy: Number,
    kineticEnergy: Number,
    totalEnergy: Number
  }],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EnergyAttempt', energyAttemptSchema);

const mongoose = require('mongoose');

const springAttemptSchema = new mongoose.Schema({
  springConstant_k: { type: Number, required: true }, // Theoretical k
  masses: [{ type: Number }], // kg
  dataPoints: [{
    mass: Number,
    force: Number,
    extension: Number
  }],
  calculatedAvgK: { type: Number },
  errorsApplied: {
    parallax: Boolean,
    nonLinearity: Boolean
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpringAttempt', springAttemptSchema);

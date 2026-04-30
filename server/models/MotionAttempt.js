const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  time: { type: Number, required: true },
  velocity: { type: Number, required: true },
  displacement: { type: Number, required: true }
}, { _id: false });

const motionAttemptSchema = new mongoose.Schema({
  initialVelocity: { type: Number, required: true },
  acceleration: { type: Number, required: true },
  errorsApplied: {
    measurementNoise: { type: Boolean, default: false },
    timeDelay: { type: Boolean, default: false }
  },
  dataPoints: [dataPointSchema],
  calculatedSlope: { type: Number },
  calculatedArea: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('MotionAttempt', motionAttemptSchema);

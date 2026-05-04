const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  z1: {
    real: { type: Number, required: true },
    imaginary: { type: Number, required: true }
  },
  z2: {
    real: { type: Number, required: true },
    imaginary: { type: Number, required: true }
  },
  operation: { type: String, required: true, enum: ['add', 'subtract', 'multiply', 'none'] },
  result: {
    real: { type: Number, required: true },
    imaginary: { type: Number, required: true },
    modulus: { type: Number, required: true }
  }
}, { _id: false });

const quizResultSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  userAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const complexNumberAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, depends on auth implementation
  operations: [operationSchema],
  quizResults: [quizResultSchema],
  conclusion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ComplexNumberAttempt', complexNumberAttemptSchema);

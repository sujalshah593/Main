const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    experimentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experiment',
      required: true,
      index: true,
    },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);

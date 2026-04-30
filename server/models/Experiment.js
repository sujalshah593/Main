const mongoose = require('mongoose');

/**
 * simulatorConfig drives the React Flow palette and validation rules.
 * correctConnections: logical wiring between component types and handles.
 */
const simulatorConfigSchema = new mongoose.Schema(
  {
    palette: [
      {
        type: { type: String, required: true },
        label: { type: String, required: true },
        description: { type: String, default: '' },
      },
    ],
    correctConnections: [
      {
        fromType: { type: String, required: true },
        fromHandle: { type: String, required: true },
        toType: { type: String, required: true },
        toHandle: { type: String, required: true },
      },
    ],
    /** Optional guided hint text shown in simulator. */
    hintText: { type: String, trim: true, default: '' },
    /** Optional image path or URL shown when learner opens simulator hint. */
    hintImagePath: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const selfEvalQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const experimentSchema = new mongoose.Schema(
  {
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true, index: true },
    title: { type: String, required: true, trim: true },
    /** Public URL path served by Express, e.g. /practicals/franck-hertz.pdf (one PDF per experiment). */
    practicalPdfPath: { type: String, trim: true, default: '' },
    theory: { type: String, required: true },
    procedure: { type: String, required: true },
    assignment: { type: String, required: true },
    references: { type: String, required: true },
    selfEvaluation: { type: [selfEvalQuestionSchema], default: [] },
    simulatorConfig: { type: simulatorConfigSchema, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experiment', experimentSchema);

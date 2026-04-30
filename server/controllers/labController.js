const Lab = require('../models/Lab');

async function getLabs(_req, res) {
  try {
    const labs = await Lab.find().sort({ name: 1 }).lean();
    res.json(labs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch labs', error: err.message });
  }
}

module.exports = { getLabs };

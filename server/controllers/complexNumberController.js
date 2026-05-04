const ComplexNumberAttempt = require('../models/ComplexNumberAttempt');

exports.saveAttempt = async (req, res) => {
  try {
    const attempt = new ComplexNumberAttempt(req.body);
    await attempt.save();
    res.status(201).json({ success: true, data: attempt });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await ComplexNumberAttempt.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.calculate = (req, res) => {
  const { z1, z2, operation } = req.body;
  let result = { real: 0, imag: 0 };

  if (operation === 'add') {
    result = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
  } else if (operation === 'subtract') {
    result = { real: z1.real - z2.real, imag: z1.imag - z2.imag };
  } else if (operation === 'multiply') {
    result = { 
      real: z1.real * z2.real - z1.imag * z2.imag, 
      imag: z1.real * z2.imag + z1.imag * z2.real 
    };
  } else {
    result = { real: z1.real, imag: z1.imag };
  }

  const modulus = Math.sqrt(result.real ** 2 + result.imag ** 2);

  res.json({
    success: true,
    data: {
      ...result,
      modulus
    }
  });
};

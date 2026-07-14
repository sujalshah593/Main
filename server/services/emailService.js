const nodemailer = require('nodemailer');

const sendFeedbackEmail = async (feedbackData) => {
  const { experimentTitle, message, rating } = feedbackData;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"Quantum AI Lab Feedback" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Sending to the same email as the user requested
    subject: `New Feedback: ${experimentTitle || 'General Lab Feedback'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #7A1540; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #7A1540; border-bottom: 2px solid #7A1540; padding-bottom: 10px;">New Feedback Received</h2>
        <p><strong>Experiment:</strong> ${experimentTitle || 'General'}</p>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-top: 10px;">
          <p style="margin: 0; color: #333; line-height: 1.5;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 20px;">This email was sent automatically from the Quantum AI Lab platform.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendFeedbackEmail };

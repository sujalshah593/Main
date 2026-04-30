require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { connectDB } = require('./config/db');
const labRoutes = require('./routes/labRoutes');
const experimentRoutes = require('./routes/experimentRoutes');
const singleExperimentRoutes = require('./routes/singleExperimentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { attachPythonLabSocket } = require('./realtime/pythonLabSocket');

const app = express();
const PORT = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    credentials: true,
  },
});

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(express.json());

app.use('/practicals', express.static(path.join(__dirname, 'public', 'practicals')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'quantum-ai-virtual-lab-api' });
});

app.use('/api/labs', labRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/experiment', singleExperimentRoutes);
app.use('/api/feedback', feedbackRoutes);
attachPythonLabSocket(io);

async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`API + Socket listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

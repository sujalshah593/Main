const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const EXEC_TIMEOUT_MS = 10_000;
const PYTHON_BIN = process.env.PYTHON_BIN || 'python';

function attachPythonLabSocket(io) {
  io.on('connection', (socket) => {
    let child = null;
    let timeoutId = null;
    let tempFilePath = '';

    const emitStatus = (message) => socket.emit('python:status', { message });

    const cleanup = async () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (tempFilePath) {
        try {
          await fs.unlink(tempFilePath);
        } catch {
          // Ignore cleanup failures.
        }
        tempFilePath = '';
      }
      child = null;
    };

    const stopProcess = async (reason = 'Stopped') => {
      if (!child) return;
      const proc = child;
      child = null;
      try {
        proc.kill('SIGTERM');
      } catch {
        // Ignore process-kill errors.
      }
      emitStatus(reason);
      await cleanup();
    };

    socket.on('python:start', async ({ code }) => {
      if (child) {
        socket.emit('python:error', { message: 'A Python process is already running.' });
        return;
      }
      if (typeof code !== 'string' || !code.trim()) {
        socket.emit('python:error', { message: 'Code is required to start execution.' });
        return;
      }

      try {
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'python-lab-'));
        tempFilePath = path.join(tempDir, 'main.py');
        await fs.writeFile(tempFilePath, code, 'utf8');

        child = spawn(PYTHON_BIN, ['-u', tempFilePath], {
          cwd: tempDir,
          env: {
            PATH: process.env.PATH || '',
            PYTHONUNBUFFERED: '1',
          },
          shell: false,
          windowsHide: true,
        });

        timeoutId = setTimeout(async () => {
          if (!child) return;
          socket.emit('python:error', { message: `Execution timed out after ${EXEC_TIMEOUT_MS / 1000}s.` });
          await stopProcess('Stopped (timeout)');
        }, EXEC_TIMEOUT_MS);

        socket.emit('python:started', { pid: child.pid });
        emitStatus('Running');

        child.stdout.on('data', (data) => {
          socket.emit('python:stdout', { data: data.toString() });
        });

        child.stderr.on('data', (data) => {
          socket.emit('python:stderr', { data: data.toString() });
        });

        child.on('error', async (err) => {
          socket.emit('python:error', { message: `Failed to run Python: ${err.message}` });
          await cleanup();
        });

        child.on('close', async (codeValue, signal) => {
          socket.emit('python:exit', { code: codeValue, signal });
          emitStatus('Idle');
          await cleanup();
        });
      } catch (err) {
        socket.emit('python:error', { message: `Execution setup failed: ${err.message}` });
        await cleanup();
      }
    });

    socket.on('python:stdin', ({ data }) => {
      if (!child || !child.stdin.writable) return;
      child.stdin.write(typeof data === 'string' ? data : '');
    });

    socket.on('python:stop', async () => {
      await stopProcess('Stopped by user');
    });

    socket.on('disconnect', async () => {
      await stopProcess('Stopped (client disconnected)');
    });
  });
}

module.exports = { attachPythonLabSocket };

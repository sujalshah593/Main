import { useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { motion } from 'framer-motion';
import { TerminalSquare, Play, Square, RotateCcw, CodeSquare } from 'lucide-react';
import '@xterm/xterm/css/xterm.css';

const CODE_STORAGE_KEY = 'python-lab-editor-code-v1';

const STARTER_CODE = `# Student Grade Management System
students = {}

def add_student():
    name = input("Enter student name: ")
    marks = int(input("Enter marks: "))
    students[name] = marks
    print(f"{name} added successfully.\\n")

def view_students():
    if not students:
        print("No student records found.\\n")
    else:
        print("\\nStudent Records:")
        for name, marks in students.items():
            print(f"{name} : {marks}")
        print()

def search_student():
    name = input("Enter student name to search: ")
    if name in students:
        print(f"{name}'s Marks: {students[name]}\\n")
    else:
        print("Student not found.\\n")

def calculate_result():
    if not students:
        print("No data available.\\n")
        return
    total = sum(students.values())
    avg = total / len(students)
    topper = max(students, key=students.get)
    print(f"Average Marks: {avg:.2f}")
    print(f"Topper: {topper} ({students[topper]} marks)\\n")

while True:
    print("1. Add Student")
    print("2. View Students")
    print("3. Search Student")
    print("4. Calculate Result")
    print("5. Exit")
    choice = input("Enter your choice: ")
    if choice == "1":
        add_student()
    elif choice == "2":
        view_students()
    elif choice == "3":
        search_student()
    elif choice == "4":
        calculate_result()
    elif choice == "5":
        print("Exiting program...")
        break
    else:
        print("Invalid choice! Try again.\\n")
`;

function editorStats(code) {
  return { lines: code.split('\n').length, chars: code.length };
}

export default function PythonEditorPage() {
  const [code, setCode] = useState(() => localStorage.getItem(CODE_STORAGE_KEY) || STARTER_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Connecting...');
  const [fontSize, setFontSize] = useState(15);

  const socketRef = useRef(null);
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const currentInputRef = useRef('');
  const isRunningRef = useRef(false);

  const stats = useMemo(() => editorStats(code), [code]);

  useEffect(() => {
    localStorage.setItem(CODE_STORAGE_KEY, code);
  }, [code]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    const term = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#0a0f1a', // integrate closely with bg
        foreground: '#e0eaf6',
        cursor: '#38bdf8',
        selectionBackground: 'rgba(56, 189, 248, 0.3)',
      },
    });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    term.loadAddon(fitAddon);
    term.open(terminalContainerRef.current);
    
    // Slight delay to ensure DOM layout is computed
    setTimeout(() => {
        fitAddon.fit();
    }, 100);

    term.writeln('Python terminal ready.');
    term.writeln('Press "Run" and type directly here for input().');
    term.write('\r\n$ ');
    terminalRef.current = term;

    const socket = io('/', { path: '/socket.io', transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected');
      term.writeln('\r\n[Connected to Python runtime]');
      term.write('$ ');
    });

    socket.on('disconnect', () => {
      setStatus('Disconnected');
      setIsRunning(false);
      term.writeln('\r\n[Disconnected from server]');
      term.write('$ ');
    });

    socket.on('python:started', () => {
      setIsRunning(true);
      currentInputRef.current = '';
      term.writeln('\r\n[Program started]');
    });

    socket.on('python:stdout', ({ data }) => {
      term.write(data);
    });

    socket.on('python:stderr', ({ data }) => {
      term.write(`\r\n[stderr] ${data}`);
    });

    socket.on('python:error', ({ message }) => {
      term.writeln(`\r\n[error] ${message}`);
    });

    socket.on('python:status', ({ message }) => {
      setStatus(message);
    });

    socket.on('python:exit', ({ code: exitCode, signal }) => {
      setIsRunning(false);
      term.writeln(`\r\n[Process exited${exitCode !== null ? ` with code ${exitCode}` : ''}${signal ? `, signal ${signal}` : ''}]`);
      term.write('$ ');
    });

    const onResize = () => fitAddon.fit();
    window.addEventListener('resize', onResize);

    const disposable = term.onData((data) => {
      const socketClient = socketRef.current;
      if (!socketClient || !isRunningRef.current) return;

      if (data === '\r') {
        socketClient.emit('python:stdin', { data: `${currentInputRef.current}\n` });
        term.write('\r\n');
        currentInputRef.current = '';
      } else if (data === '\u007F') {
        if (currentInputRef.current.length > 0) {
          currentInputRef.current = currentInputRef.current.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data >= ' ') {
        currentInputRef.current += data;
        term.write(data);
      }
    });

    return () => {
      disposable.dispose();
      window.removeEventListener('resize', onResize);
      socket.disconnect();
      term.dispose();
    };
  }, []);

  const runCode = () => {
    if (!socketRef.current?.connected) {
      terminalRef.current?.writeln('\r\n[error] Socket is not connected.');
      return;
    }
    if (isRunning) {
      terminalRef.current?.writeln('\r\n[error] Program is already running.');
      return;
    }
    terminalRef.current?.writeln('\r\n[Running python code]');
    socketRef.current.emit('python:start', { code });
  };

  const stopCode = () => {
    socketRef.current?.emit('python:stop');
  };

  return (
    <section className="flex flex-col h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden gap-4 pb-4">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lab-accent3/10 text-lab-accent3 border border-lab-accent3/20 shadow-[0_0_15px_rgba(56,189,248,0.15)] flex-shrink-0">
            <CodeSquare size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-display text-xl font-bold text-white truncate">Python Workbench</h1>
             <div className="flex items-center gap-2 mt-1 text-xs font-mono text-lab-muted">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status === 'Connected' ? 'bg-emerald-500' : 'bg-amber-500'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'Connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                {status}
             </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
           <button
             type="button"
             onClick={runCode}
             disabled={isRunning || status !== 'Connected'}
             className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.15)]"
           >
             <Play size={14} fill="currentColor" /> {isRunning ? 'Running...' : 'Run'}
           </button>
           <button
             type="button"
             onClick={stopCode}
             disabled={!isRunning}
             className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(244,63,94,0.15)]"
           >
             <Square size={14} fill="currentColor" /> Stop
           </button>
           <button
             type="button"
             onClick={() => {
                setCode(STARTER_CODE);
                localStorage.setItem(CODE_STORAGE_KEY, STARTER_CODE);
                terminalRef.current?.writeln('\r\n[Editor reset to starter code]');
             }}
             className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 text-lab-muted border border-white/10 hover:bg-white/10 hover:text-white transition-all"
           >
             <RotateCcw size={14} /> Reset
           </button>
        </div>
      </motion.header>

      {/* Main layout */}
      <div className="flex flex-1 gap-4 overflow-hidden relative flex-col lg:flex-row flex-nowrap h-full">
        {/* Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col rounded-2xl glass-panel overflow-hidden border border-white/5 relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#080e1a]/80 border-b border-white/5">
            <div className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-widest text-[#e0eaf6]/50">
              main.py
            </div>
            <div className="flex gap-4 items-center text-[10px] uppercase font-bold text-[#e0eaf6]/40 hidden sm:flex">
               <span>Lines: {stats.lines}</span>
               <span>Chars: {stats.chars}</span>
            </div>
          </div>
          <div className="flex-1 w-full bg-[#1e1e1e] relative">
            <Editor
               height="100%"
               defaultLanguage="python"
               theme="vs-dark"
               value={code}
               onChange={(value) => setCode(value || '')}
               options={{
                 minimap: { enabled: false }, // minimized distraction
                 fontSize,
                 lineNumbers: 'on',
                 scrollBeyondLastLine: false,
                 automaticLayout: true,
                 tabSize: 4,
                 wordWrap: 'on',
                 formatOnPaste: true,
                 formatOnType: true,
                 padding: { top: 16 }
               }}
            />
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-1/3 lg:h-full lg:w-[450px] xl:w-[500px] flex-shrink-0 flex flex-col rounded-2xl glass-panel overflow-hidden border border-white/5 bg-[#0a0f1a]/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-lab-accent3 flex items-center gap-2">
              <TerminalSquare size={14} /> Interactive Terminal
            </h2>
          </div>
          <div className="flex-1 w-full relative p-2 overflow-hidden bg-transparent">
            {/* The terminal Container uses absolute inset zero to fill accurately for FitAddon */}
            <div ref={terminalContainerRef} className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)]" />
          </div>
        </motion.div>
      </div>
    </section>
   )
}

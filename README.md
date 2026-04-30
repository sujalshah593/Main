# Quantum AI Virtual Lab

Production-style MERN educational web app for virtual physics practicals with drag-and-drop wiring (React Flow), Express API, and MongoDB.

## Prerequisites

- Node.js 18+
- MongoDB running locally (or set `MONGODB_URI` to Atlas)

## Quick start

### 1. Backend

```bash
cd server
# Linux/macOS: cp .env.example .env
# Windows PowerShell: Copy-Item .env.example .env
npm install
npm run seed
npm run dev
```

API listens on `http://localhost:5000` (or `PORT` from `.env`).

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to the Express server.

### 3. Production build (client)

```bash
cd client
npm run build
npm run preview
```

Set `VITE_API_URL` when the API is hosted on another origin.

## Project layout

```
Main/
├── client/                 # React + Vite + Tailwind
│   └── src/
│       ├── api/
│       ├── components/
│       │   └── simulator/  # React Flow bench + LabNode
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       └── utils/
├── server/                 # Express + Mongoose
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── seed/
└── README.md
```

## HTTP API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/labs` | List lab categories |
| GET | `/api/experiments/:labId` | List experiments for a lab |
| GET | `/api/experiment/:id` | Full experiment (theory, simulator config, etc.) |
| POST | `/api/feedback` | Body: `{ experimentId, message, rating }` |

## Simulator validation

Each experiment ships a `simulatorConfig` with a `palette` and `correctConnections`. The client resolves each edge to `(fromType, fromHandle → toType, toHandle)` and compares sorted multisets to the expected list. Matching wiring shows **Correct setup**; otherwise **Incorrect setup**.

## Tech choices

- **React Flow** (`@xyflow/react`) for nodes, edges, and palette drag-and-drop onto the canvas.
- **No authentication** — all routes are public as requested.
- **Responsive UI** — sidebar on large screens, compact top navigation on small screens.

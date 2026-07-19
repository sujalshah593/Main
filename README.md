# Quantum AI Virtual Lab

Created by:
- [sujalshah593](https://github.com/sujalshah593)
- [nidhiv1303](https://github.com/nidhiv1303)

---

## 📖 Overview

**Quantum AI Virtual Lab** is a production-ready, interactive educational web application designed for running virtual physics and electronics practicals. It provides a highly visual, drag-and-drop wiring interface for students to simulate and validate complex circuit setups in a browser environment.

## ✨ Key Features

- **Interactive Simulator Workspace**: Uses React Flow for an intuitive, node-based drag-and-drop canvas.
- **Real-Time Validation**: Evaluates the user's wiring diagram against expected configurations to provide instant "Correct setup" or "Incorrect setup" feedback.
- **Component Palette**: Easily pull in nodes representing different physical components (e.g., batteries, resistors, logic gates, voltmeters).
- **Comprehensive API**: A robust Express and MongoDB backend to manage lab categories, theoretical material, and simulator configurations.
- **Responsive Design**: Adapts beautifully across various screen sizes—featuring a spacious sidebar for desktops and a compact top navigation for mobile devices.
- **No Friction**: Publicly accessible routes meant to provide immediate access to learning tools without the need for authentication.

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for rapid, modern styling
- [React Flow (`@xyflow/react`)](https://reactflow.dev/) for the node-based simulator canvas

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for data modeling

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally, or set up a cluster on MongoDB Atlas)

### 1. Backend Setup

Navigate to the server directory, install dependencies, and start the development server.

```bash
cd server

# Copy the sample environment file
# On Linux/macOS:
cp .env.example .env
# On Windows PowerShell:
Copy-Item .env.example .env

# Install dependencies
npm install

# Seed the database with initial lab data
npm run seed

# Start the Express API server (runs on http://localhost:5000 by default)
npm run dev
```

### 2. Frontend Setup

In a new terminal window, navigate to the client directory.

```bash
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will be available at `http://localhost:5173`. Vite is configured to automatically proxy `/api` requests to the Express backend.

### 3. Production Build

To build the client for production:

```bash
cd client
npm run build
npm run preview
```
*Note: Remember to configure the `VITE_API_URL` environment variable if your API is hosted on a different domain in production.*

## 📂 Project Architecture

```text
Main/
├── client/                 # Frontend (React + Vite + Tailwind)
│   └── src/
│       ├── api/            # API integration and Axios instances
│       ├── components/     # Reusable UI components
│       │   └── simulator/  # React Flow bench, palette, and LabNode logic
│       ├── hooks/          # Custom React hooks
│       ├── layouts/        # Layout wrappers (Sidebar, Top Nav)
│       ├── pages/          # Primary page views (Home, Lab, Simulator)
│       └── utils/          # Helper functions and constants
├── server/                 # Backend (Express + Mongoose)
│   ├── config/             # Database connection and environment config
│   ├── controllers/        # Request handling logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   └── seed/               # Initial database population scripts
└── README.md
```

## 🔌 HTTP API Endpoints

The backend provides the following RESTful routes:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/labs` | Retrieves a list of all lab categories. |
| `GET` | `/api/experiments/:labId` | Retrieves all experiments associated with a specific lab. |
| `GET` | `/api/experiment/:id` | Retrieves full details for a specific experiment (including theory and `simulatorConfig`). |
| `POST` | `/api/feedback` | Submits user feedback. <br> **Body:** `{ experimentId, message, rating }` |

## 🧪 How Simulator Validation Works

Every experiment in the database includes a `simulatorConfig` object, which defines:
1. **Palette:** The available components for the experiment.
2. **Correct Connections:** The exact wiring paths required to successfully complete the practical.

When a user connects components on the canvas, the client processes each edge. It resolves the connection format to `(fromType, fromHandle → toType, toHandle)`. These user-generated connections are sorted and compared against the expected multisets in the database. 
- If they match exactly, the UI displays a **Correct setup** success message.
- If they do not match, an **Incorrect setup** warning prompts the user to try again.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request if you have ideas on how to improve the Quantum AI Virtual Lab.

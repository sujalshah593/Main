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

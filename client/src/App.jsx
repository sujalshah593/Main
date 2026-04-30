import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import LabsPage from './pages/LabsPage.jsx';
import SemesterHubPage from './pages/SemesterHubPage.jsx';
import TheoryPage from './pages/TheoryPage.jsx';
import PracticalPage from './pages/PracticalPage.jsx';
import ExperimentsPage from './pages/ExperimentsPage.jsx';
import ExperimentDetailPage from './pages/ExperimentDetailPage.jsx';
import SimulatorPage from './pages/SimulatorPage.jsx';
import PythonEditorPage from './pages/PythonEditorPage.jsx';
import VernierCaliperPage from './pages/VernierCaliperPage.jsx';
import ScrewGaugePage from './pages/ScrewGaugePage.jsx';
import VolumeDensityPage from './pages/VolumeDensityPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/semester/:semesterId" element={<SemesterHubPage />} />
        <Route path="/semester/:semesterId/theory" element={<TheoryPage />} />
        <Route path="/semester/:semesterId/practical" element={<PracticalPage />} />
        <Route path="/python-editor" element={<PythonEditorPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:labId/experiments" element={<ExperimentsPage />} />
        <Route path="/experiment/:id" element={<ExperimentDetailPage />} />
        <Route path="/experiment/:id/simulator" element={<SimulatorPage />} />
        <Route path="/vernier-caliper" element={<VernierCaliperPage />} />
        <Route path="/screw-gauge" element={<ScrewGaugePage />} />
        <Route path="/volume-density" element={<VolumeDensityPage />} />
      </Route>
    </Routes>
  );
}

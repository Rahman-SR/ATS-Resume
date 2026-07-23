import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import BuilderSelection from './pages/BuilderSelection';
import Dashboard from './pages/Dashboard';
import QuickBuilder from './pages/QuickBuilder';
import ClassicBuilder from './pages/ClassicBuilder';

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder-selection" element={<BuilderSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/build/quick" element={<QuickBuilder />} />
        <Route path="/build/classic" element={<ClassicBuilder />} />
      </Routes>
    </div>
  );
}

export default App;

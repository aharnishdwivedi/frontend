import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import IncidentDetail from './pages/IncidentDetail';
import CreateIncident from './pages/CreateIncident';
import { IncidentProvider } from './context/IncidentContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <IncidentProvider>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents/new" element={<CreateIncident />} />
            <Route path="/incidents/:id" element={<IncidentDetail />} />
          </Routes>
        </main>
      </IncidentProvider>
    </div>
  );
}

export default App;

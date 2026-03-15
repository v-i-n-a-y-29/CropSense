/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import FarmerApp from './pages/FarmerApp';
import CHCPortal from './pages/CHCPortal';
import GovDashboard from './pages/GovDashboard';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmer/*" element={<FarmerApp />} />
          <Route path="/chc/*" element={<CHCPortal />} />
          <Route path="/gov/*" element={<GovDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

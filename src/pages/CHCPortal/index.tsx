import { Routes, Route } from 'react-router-dom';
import FleetManagement from './FleetManagement';

export default function CHCPortal() {
  return (
    <Routes>
      <Route path="/" element={<FleetManagement />} />
    </Routes>
  );
}

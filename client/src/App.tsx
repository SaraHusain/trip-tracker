import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import Habits from './pages/Habits';
import Journal from './pages/Journal';
import Settings from './pages/Settings';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<NewEntry />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);

export default App;
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import Habits from './pages/Habits';
import Journal from './pages/Journal';
import Settings from './pages/Settings';

const App: React.FC = () => (
	<HashRouter>
		<nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
			<Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
			<Link to="/new" style={{ marginRight: '1rem' }}>New Entry</Link>
			<Link to="/journal" style={{ marginRight: '1rem' }}>Journal</Link>
		</nav>
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/new" element={<NewEntry />} />
			<Route path="/habits" element={<Habits />} />
			<Route path="/journal" element={<Journal />} />
			<Route path="/settings" element={<Settings />} />
		</Routes>
	</HashRouter>
);

export default App;
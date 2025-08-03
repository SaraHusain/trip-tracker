import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import Habits from './pages/Habits';
import Journal from './pages/Journal';
import Settings from './pages/Settings';
import Success from './pages/Success';
import Fail from './pages/Fail';
import Heatmap from './pages/Heatmap';
import Chart from './pages/Chart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

const App: React.FC = () => (
	<HashRouter>
		<nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
			<Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
			<Link to="/new" style={{ marginRight: '1rem' }}>New Entry</Link>
			<Link to="/journal" style={{ marginRight: '1rem' }}>Journal</Link>
			<Link to="/habits" style={{ marginRight: '1rem' }}>Habits</Link>
			<Link to="/heatmap" style={{ marginRight: '1rem' }}>Heatmap</Link>
			<Link to="/chart" style={{ marginRight: '1rem' }}>Streak Chart</Link>
		</nav>
		<Routes>
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
			<Route path="/new" element={<PrivateRoute><NewEntry /></PrivateRoute>} />
			<Route path="/habits" element={<PrivateRoute><Habits /></PrivateRoute>} />
			<Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
			<Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
			<Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
			<Route path="/fail" element={<PrivateRoute><Fail /></PrivateRoute>} />
			<Route path="/heatmap" element={<PrivateRoute><Heatmap /></PrivateRoute>} />
			<Route path="/chart" element={<PrivateRoute><Chart /></PrivateRoute>} />
		</Routes>
	</HashRouter>
);

export default App;
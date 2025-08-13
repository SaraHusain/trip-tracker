import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import Logout from './pages/Logout';
import Layout from './components/Layout';

const App: React.FC = () => (
	<HashRouter>
		<Routes>

			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />

			<Route element={<Layout />}>
				<Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
				<Route path="/new" element={<PrivateRoute><NewEntry /></PrivateRoute>} />
				<Route path="/habits" element={<PrivateRoute><Habits /></PrivateRoute>} />
				<Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
				<Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
				<Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
				<Route path="/fail" element={<PrivateRoute><Fail /></PrivateRoute>} />
				<Route path="/heatmap" element={<PrivateRoute><Heatmap /></PrivateRoute>} />
				<Route path="/chart" element={<PrivateRoute><Chart /></PrivateRoute>} />
				<Route path="/logout" element={<Logout />} />
			</Route>

		</Routes>
	</HashRouter>
);

export default App;
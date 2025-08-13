import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    const isLoggedIn = !!localStorage.getItem('tt_token');

    return (
        <>
            {isLoggedIn && (
                <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
                    <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
                    <Link to="/new" style={{ marginRight: '1rem' }}>New Entry</Link>
                    <Link to="/journal" style={{ marginRight: '1rem' }}>Journal</Link>
                    <Link to="/habits" style={{ marginRight: '1rem' }}>Habits</Link>
                    <Link to="/heatmap" style={{ marginRight: '1rem' }}>Heatmap</Link>
                    <Link to="/chart" style={{ marginRight: '1rem' }}>Streak Chart</Link>
                    <Link to="/logout" style={{ marginRight: '1rem' }}>Logout</Link>
                </nav>
            )}
            <Outlet />
        </>
    );
};

export default Layout;
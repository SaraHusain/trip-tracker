import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    const isLoggedIn = !!localStorage.getItem('tt_token');

    return (
        <>
            {isLoggedIn && (
                <nav>
                    <Link to="/" className='nav-items'>Dashboard</Link>
                    <Link to="/new" className='nav-items'>New Entry</Link>
                    <Link to="/journal" className='nav-items'>Journal</Link>
                    <Link to="/habits" className='nav-items'>Habits</Link>
                    <Link to="/heatmap" className='nav-items'>Heatmap</Link>
                    <Link to="/chart" className='nav-items'>Streak Chart</Link>
                    <Link to="/logout" className='nav-items'>Logout</Link>
                </nav>
            )}
            <Outlet />
        </>
    );
};

export default Layout;
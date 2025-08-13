import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate();

    useEffect(() => {
        localStorage.removeItem('tt_token');
        nav('/login');
    }, [nav]);

    return null;
};

export default Logout;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fail: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className='main-container'>
            <h1>Fail!</h1>
            <p>Entry was not added</p>
            <button className='action-button button' onClick={() => navigate('/')}>Return to Dashboard</button>
        </div>
    );
};

export default Fail;
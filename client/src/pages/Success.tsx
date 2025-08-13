import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className='main-container'>
            <h1>Success!</h1>
            <p>Entry added successfully</p>
            <button className='action-button button' onClick={() => navigate('/')}>Return to Dashboard</button>
        </div>
    );
};

export default Success;
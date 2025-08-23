import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className='main-container'>
            <h1>Success!</h1>
            <p>Entry added successfully</p>
            <div className='row' style={{gap: '10px'}}>
                <button className='secondary-button button' style={{width: '100%'}} onClick={() => navigate('/journal')}>Go to Journal</button>
                <button className='action-button button' style={{width: '100%'}} onClick={() => navigate('/')}>Return to Dashboard</button>
            </div>
        </div>
    );
};

export default Success;
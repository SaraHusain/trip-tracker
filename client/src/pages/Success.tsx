import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Success!</h1>
            <p>Entry added successfully</p>
            <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Return to Dashboard</button>
        </div>
    );
};

export default Success;
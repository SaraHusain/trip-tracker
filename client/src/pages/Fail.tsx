import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fail: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Fail!</h1>
            <p>Entry was not added</p>
            <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Return to Dashboard</button>
        </div>
    );
};

export default Fail;
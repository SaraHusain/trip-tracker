import React from 'react';
import { useNavigate } from 'react-router-dom';

const Empty: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className='empty-div'>
            <img
                src='/empty.jpg'
                className='empty-image'
            />
            <div style={{textAlign: 'center'}}>
                <h3>No habits tracked yet</h3>
                <p>Start building good habits by adding your first one</p>
                <button className="action-button button" onClick={() => navigate('/habits')}>Create Your First Habit</button>
            </div>
        </div>
    );
};

export default Empty;
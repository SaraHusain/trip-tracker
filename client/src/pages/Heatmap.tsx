import React, { useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';
import HeatmapCalendar from '../components/HeatmapCalendar';

const Heatmap: React.FC = () => {
    const { habits } = useContext(HabitsContext);

    return (
        <div className='main-container'>
            {/* Habits Calendar Heatmap */}
            {habits.map(h => (
                <div key={h._id} style={{ marginTop: '2rem' }}>
                    <h3 style={{ textTransform: 'capitalize' }}>{h.name} Heatmap</h3>
                    <HeatmapCalendar habits={habits} habitId={h._id} />
                </div>
            ))}
        </div>
    );
};

export default Heatmap;
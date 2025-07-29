import React, { useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';
import StreakChart from '../components/StreakChart';

const Chart: React.FC = () => {
    const { habits } = useContext(HabitsContext);

    return (
        <div style={{ padding: '1rem' }}>
            {/* Habits Streak Chart */}
            {habits.map(h => (
                <div key={h._id} style={{ marginTop: '2rem' }}>
                    <h3>{h.name} Streak (Last 30 days)</h3>
                    <StreakChart habit={h} />
                </div>
            ))}
        </div>
    );
};

export default Chart;
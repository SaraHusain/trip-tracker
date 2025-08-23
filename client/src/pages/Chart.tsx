import React, { useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';
import StreakChart from '../components/StreakChart';
import Empty from '../components/Empty';

const Chart: React.FC = () => {
    const { habits } = useContext(HabitsContext);

    return (
        <div className='main-container'>
            {/* Habits Streak Chart */}
            {habits.length > 0 ?
                habits.map(h => (
                    <div key={h._id} style={{ marginTop: '2rem' }}>
                        <h3 style={{ textTransform: 'capitalize' }}>{h.name} Streak (Last 30 days)</h3>
                        <StreakChart habit={h} />
                    </div>
                )) : (
                    <Empty />
                )
            }
        </div>
    );
};

export default Chart;
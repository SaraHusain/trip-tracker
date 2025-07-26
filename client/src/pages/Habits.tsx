import React, { useState, useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';
import HeatmapCalendar from '../components/HeatmapCalendar';
import StreakChart from '../components/StreakChart';

const Habits: React.FC = () => {
    const { habits, addHabit, toggleHabit } = useContext(HabitsContext);
    const [newHabit, setNewHabit] = useState('');
    const today = new Date().toISOString().split('T')[0];

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Habits</h1>

            {/* Add New Habit */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="New habit"
                    value={newHabit}
                    onChange={e => setNewHabit(e.target.value)}
                />
                <button
                    onClick={() => {
                        if (newHabit.trim()) {
                            addHabit(newHabit.trim());
                            setNewHabit('');
                        }
                    }}
                >
                    Add
                </button>
            </div>

            {/* Habit List */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {habits.map(h => (
                    <li key={h.id} style={{ marginBottom: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={h.completedDates.includes(today)}
                                onChange={() => toggleHabit(h.id, today)}
                            />
                            <span style={{ marginLeft: '0.5rem' }}>{h.name}</span>
                        </label>
                    </li>
                ))}
            </ul>

            {/* Habits Calendar Heatmap */}
            {habits.map(h => (
                <div key={h.id} style={{ marginTop: '2rem' }}>
                    <h3>{h.name} Heatmap</h3>
                    <HeatmapCalendar habits={habits} habitId={h.id} />
                    <h3>{h.name} Streak (Last 30 days)</h3>
                    <StreakChart habit={h} />
                </div>
            ))}
        </div>
    );
};

export default Habits;
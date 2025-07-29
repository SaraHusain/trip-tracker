import React, { useState, useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';

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
                {habits.map(h => {
                    const dates = Array.isArray(h.completedDates) ? h.completedDates : [];
                    const isDone = dates.includes(today);
                    return (
                        <li key={h._id} style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => toggleHabit(h._id, today)}
                                />
                                <span style={{ marginLeft: '0.5rem' }}>{h.name}</span>
                            </label>
                        </li>
                    )})
                }
            </ul>
        </div>
    );
};

export default Habits;
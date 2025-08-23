import React, { useState, useContext } from 'react';
import { HabitsContext } from '../context/HabitsContext';

const Habits: React.FC = () => {
    const { habits, addHabit, toggleHabit } = useContext(HabitsContext);
    const [newHabit, setNewHabit] = useState('');
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='main-container'>
            <h1>Habits</h1>

            {/* Add New Habit */}
            <div className='habit-form'>
                <h3>Add a new habit</h3>
                <input
                    type="text"
                    placeholder="New habit"
                    value={newHabit}
                    onChange={e => setNewHabit(e.target.value)}
                    required
                />
                <button
                    onClick={() => {
                        if (newHabit.trim()) {
                            addHabit(newHabit.trim());
                            setNewHabit('');
                        }
                    }}
                    className='action-button button'
                >
                    Add
                </button>
            </div>

            {/* Habit List */}
            <ul>
                {habits.map(h => {
                    const dates = Array.isArray(h.completedDates) ? h.completedDates : [];
                    const isDone = dates.includes(today);
                    return (
                        <li key={h._id} style={{ marginBottom: '0.5rem' }}>
                            <h3>Habits list</h3>
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
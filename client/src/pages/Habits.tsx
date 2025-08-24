import React, { useState, useContext } from 'react';
import { HabitsContext, Habit } from '../context/HabitsContext';

const Habits: React.FC = () => {
    const { habits, addHabit, toggleHabit, deleteHabit } = useContext(HabitsContext);
    const [newHabit, setNewHabit] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
    const today = new Date().toISOString().split('T')[0];

    const openConfirm = (habit: Habit) => {
        setHabitToDelete(habit);
        setConfirmOpen(true);
    };

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
                            <div className='row'>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={isDone}
                                        onChange={() => toggleHabit(h._id, today)}
                                    />
                                    <span style={{ marginLeft: '0.5rem' }}>{h.name}</span>
                                </label>
                                <button className='warning-button' onClick={() => openConfirm(h)}>Delete</button>
                            </div>
                        </li>
                    )})
                }
            </ul>

            {/* Confirm Delete Modal */}
            {confirmOpen && habitToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3 style={{ marginBottom: '0.5rem' }}>Delete this habit?</h3>
                        <p style={{ marginTop: 0 }}>This action cannot be undone.</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                            <button className='action-button button' onClick={() => setConfirmOpen(false)}>Cancel</button>
                            <button
                                onClick={() => {
                                    deleteHabit(habitToDelete._id);
                                    setConfirmOpen(false);
                                }}
                                className='warning-button'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Habits;
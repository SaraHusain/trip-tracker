import React, { createContext, useState, useEffect } from 'react';

export interface Habit {
    _id: string;
    name: string;
    completedDates: string[]; // YYYY‑MM‑DD
}

interface HabitsContextType {
    habits: Habit[];
    addHabit: (name: string) => void;
    toggleHabit: (_id: string, date: string) => void;
}

export const HabitsContext = createContext<HabitsContextType>({
    habits: [],
    addHabit: () => {},
    toggleHabit: () => {},
});

const API_URL = process.env.REACT_APP_API_URL!;

export const HabitsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);

    // Load habits from server
    useEffect(() => {
        fetch(`${API_URL}/habits`)
            .then(r => r.json())
            .then((data: Habit[]) => {
                const normalized = data.map(h => ({
                    _id: h._id,
                    name: h.name,
                    completedDates: Array.isArray(h.completedDates) ? h.completedDates : [],
                }));
                setHabits(normalized);
            })
            .catch(console.error);
    }, []);

    const addHabit = async (name: string) => {
        try {
            const res = await fetch(`${API_URL}/habits`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            const saved: Habit = await res.json();
            // normalize
            const norm = {
                _id: saved._id,
                name: saved.name,
                completedDates: Array.isArray(saved.completedDates) ? saved.completedDates : []
            };
            setHabits(prev => [...prev, norm]);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleHabit = async (_id: string, date: string) => {
        setHabits(prev => 
            prev.map(h => {
                if (h._id !== _id) return h;
                const has = Array.isArray(h.completedDates) && h.completedDates.includes(date);
                const newDates = has 
                    ? h.completedDates.filter(d => d !== date)
                    : [...h.completedDates || [], date];
                return { ...h, completedDates: newDates };
            })
        );
        try {
            await fetch(`${API_URL}/habits/${_id}/toggle`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date })
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <HabitsContext.Provider value={{ habits, addHabit, toggleHabit }}>
            {children}
        </HabitsContext.Provider>
    );
};
import React, { createContext, useState, useEffect } from 'react';

export interface Habit {
    id: string;
    name: string;
    completedDates: string[]; // YYYY‑MM‑DD
}

interface HabitsContextType {
    habits: Habit[];
    addHabit: (name: string) => void;
    toggleHabit: (id: string, date: string) => void;
}

export const HabitsContext = createContext<HabitsContextType>({
    habits: [],
    addHabit: () => {},
    toggleHabit: () => {},
});

const STORAGE_KEY = 'triptracker_habits';

export const HabitsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);

    // Load from localStorage
    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) setHabits(JSON.parse(data));
    }, []);

    // Persist on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits]);

    const addHabit = (name: string) => {
        setHabits(prev => [
            ...prev,
            { id: Math.random().toString(36).substr(2, 9), name, completedDates: [] }
        ]);
    };

    const toggleHabit = (id: string, date: string) => {
        setHabits(prev =>
            prev.map(h => {
                if (h.id !== id) return h;
                const dates = h.completedDates.includes(date)
                    ? h.completedDates.filter(d => d !== date)
                    : [...h.completedDates, date];
                return { ...h, completedDates: dates };
            })
        );
    };

    return (
        <HabitsContext.Provider value={{ habits, addHabit, toggleHabit }}>
            {children}
        </HabitsContext.Provider>
    );
};
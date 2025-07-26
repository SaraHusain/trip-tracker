import { Request, Response } from 'express';
import Habit from '../models/Habit';

// Fetch all habits for a user
export const getHabits = async (req: Request, res: Response) => {
    try {
        const habits = await Habit.find({ userId: req.user?.id });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new habit
export const createHabit = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newHabit = new Habit({ name, completedDates: [], userId: req.user?.id });
        const saved = await newHabit.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Toggle a date in completedDates array
export const toggleHabitDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { date } = req.body; // expect { date: 'YYYY-MM-DD' }
        const habit = await Habit.findById(id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        const idx = habit.completedDates.indexOf(date);
        if (idx > -1) habit.completedDates.splice(idx, 1);
        else habit.completedDates.push(date);

        const updated = await habit.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
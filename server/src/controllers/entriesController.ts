import { Request, Response } from 'express';
import Entry from '../models/Entry';

// Extend Express Request type to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}

// Fetch all entries for a user (you can use userId from auth middleware)
export const getEntries = async (req: Request, res: Response) => {
    try {
        const entries = await Entry.find({ userId: req.user?.id });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new entry
export const createEntry = async (req: Request, res: Response) => {
    try {
        const { photoUri, location } = req.body;
        const newEntry = new Entry({ photoUri, location, timestamp: Date.now(), userId: req.user?.id });
        const saved = await newEntry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
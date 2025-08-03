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
        const file = req.file;
        const { lat, lng } = req.body;

        if (!file) {
            return res.status(400).json({ message: 'No photo uploaded' });
        }
        
        if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
            return res.status(400).json({ message: 'Invalid location data' });
        }

        const newEntry = new Entry({
            photoUri: `/uploads/${req.user?.id}/${file.filename}`,
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            timestamp: Date.now(),
            userId: req.user?.id
        });

        const saved = await newEntry.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
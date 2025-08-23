import { Request, Response } from 'express';
import Entry from '../models/Entry';
import fs from 'fs';
import path from 'path';

const fsPromises = fs.promises;

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

// Delete an entry
export const deleteEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // 1) Find the entry
        const entry = await Entry.findOne({ _id: id, userId: req.user?.id });
        if (!entry) {
            return res.status(404).json({ message: 'Not found or not your entry' });
        }

        // 2) If there's a photoUri, try to remove file and possibly folders
        if (entry.photoUri) {
            try {
                const uploadsDir = path.resolve(process.cwd(), 'uploads');

                // Turn the stored URI into a path and resolve it
                const cleaned = entry.photoUri.replace(/^\/+/, '');
                const photoPath = path.resolve(process.cwd(), cleaned);

                // Safety: ensure photoPath is inside uploadsDir
                const relativeToUploads = path.relative(uploadsDir, photoPath);
                // If relativeToUploads starts with '..' or is absolute, the file is outside uploads
                if (relativeToUploads.startsWith('..') || path.isAbsolute(relativeToUploads)) {
                    console.warn('Photo path is outside uploads folder — skipping file deletion:', photoPath);
                } else {
                    // Ensure the first path segment is the user id (i.e., uploads/<userId>/...)
                    const firstSegment = relativeToUploads.split(path.sep)[0];
                    if (firstSegment !== req.user?.id) {
                        console.warn('Photo does not belong to current user — skipping deletion:', relativeToUploads);
                    } else {
                        // Delete the file (ignore ENOENT)
                        try {
                            await fsPromises.unlink(photoPath);
                        } catch (err: any) {
                            if (err.code === 'ENOENT') {
                                console.warn('Photo file already missing:', photoPath);
                            } else {
                                console.error('Error deleting photo file:', err);
                            }
                        }

                        // Try to remove containing directory if it became empty (and then user dir)
                        try {
                            const dir = path.dirname(photoPath);
                            const files = await fsPromises.readdir(dir);
                            if (files.length === 0) {
                                await fsPromises.rmdir(dir); // removes only if empty

                                const userDir = path.dirname(dir);
                                const userFiles = await fsPromises.readdir(userDir);
                                if (userFiles.length === 0) {
                                    await fsPromises.rmdir(userDir);
                                }
                            }
                        } catch (err) {
                            console.error('Error when trying to clean up folders:', err);
                        }
                    }
                }
            } catch (err) {
                console.error('Error handling file removal:', err);
            }
        }

        // 3) Delete DB record
        const result = await Entry.deleteOne({ _id: id, userId: req.user?.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Not found or not your entry' });
        }

        return res.status(204).end();
    } catch (err) {
        console.error('Error deleting entry:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

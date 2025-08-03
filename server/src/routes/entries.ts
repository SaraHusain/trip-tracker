import { Router } from 'express';
import { getEntries, createEntry } from '../controllers/entriesController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Multer config: saves files to /uploads/{userId}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const userId = req.user?.id;
            if (!userId) throw new Error('User ID missing');
            
            const dir = path.join(__dirname, '../../uploads', userId);
            
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            cb(null, dir);
        } catch (err) {
            cb(err as Error, '');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// GET /api/entries
router.get('/', getEntries);
// POST /api/entries
router.post('/', upload.single('photo'), createEntry);

export default router;
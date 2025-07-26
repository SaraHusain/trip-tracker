import { Router } from 'express';
import { getEntries, createEntry } from '../controllers/entriesController';

const router = Router();

// GET /api/entries
router.get('/', getEntries);
// POST /api/entries
router.post('/', createEntry);

export default router;
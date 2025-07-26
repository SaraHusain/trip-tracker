import { Router } from 'express';
import { getHabits, createHabit, toggleHabitDate } from '../controllers/habitsController';

const router = Router();

// GET /api/habits
router.get('/', getHabits);
// POST /api/habits
router.post('/', createHabit);
// PATCH /api/habits/:id/toggle
router.patch('/:id/toggle', toggleHabitDate);

export default router;
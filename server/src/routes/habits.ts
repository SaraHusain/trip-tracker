import { Router } from 'express';
import { getHabits, createHabit, toggleHabitDate, deleteHabit } from '../controllers/habitsController';

const router = Router();

// GET /api/habits
router.get('/', getHabits);
// POST /api/habits
router.post('/', createHabit);
// PATCH /api/habits/:id/toggle
router.patch('/:id/toggle', toggleHabitDate);
// DELETE /api/habits/:id
router.delete('/:id', deleteHabit);

export default router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitsController_1 = require("../controllers/habitsController");
const router = (0, express_1.Router)();
// GET /api/habits
router.get('/', habitsController_1.getHabits);
// POST /api/habits
router.post('/', habitsController_1.createHabit);
// PATCH /api/habits/:id/toggle
router.patch('/:id/toggle', habitsController_1.toggleHabitDate);
// DELETE /api/habits/:id
router.delete('/:id', habitsController_1.deleteHabit);
exports.default = router;

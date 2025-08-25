"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabit = exports.toggleHabitDate = exports.createHabit = exports.getHabits = void 0;
const Habit_1 = __importDefault(require("../models/Habit"));
// Fetch all habits for a user
const getHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const habits = yield Habit_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(habits);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getHabits = getHabits;
// Create a new habit
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        const newHabit = new Habit_1.default({ name, completedDates: [], userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        const saved = yield newHabit.save();
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createHabit = createHabit;
// Toggle a date in completedDates array
const toggleHabitDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { date } = req.body; // expect { date: 'YYYY-MM-DD' }
        const habit = yield Habit_1.default.findById(id);
        if (!habit)
            return res.status(404).json({ message: 'Habit not found' });
        const idx = habit.completedDates.indexOf(date);
        if (idx > -1)
            habit.completedDates.splice(idx, 1);
        else
            habit.completedDates.push(date);
        const updated = yield habit.save();
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.toggleHabitDate = toggleHabitDate;
// Delete a habit
const deleteHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        // Only delete if it belongs to this user
        const result = yield Habit_1.default.deleteOne({ _id: id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(204).end();
    }
    catch (err) {
        console.error('Error deleting habit:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteHabit = deleteHabit;

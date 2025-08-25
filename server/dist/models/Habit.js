"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HabitSchema = new mongoose_1.Schema({
    name: String,
    completedDates: [String],
    userId: String
});
exports.default = (0, mongoose_1.model)('Habit', HabitSchema);

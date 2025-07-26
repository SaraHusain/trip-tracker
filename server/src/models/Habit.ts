import { Schema, model } from 'mongoose';

const HabitSchema = new Schema({
    name: String,
    completedDates: [String],
    userId: String
});

export default model('Habit', HabitSchema);
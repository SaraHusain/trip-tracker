import { Schema, model } from 'mongoose';

const EntrySchema = new Schema({
    photoUri: String,
    location: {
        lat: Number,
        lng: Number
    },
    timestamp: Number,
    userId: String
});

export default model('Entry', EntrySchema);
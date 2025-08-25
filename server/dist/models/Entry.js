"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    photoUri: String,
    location: {
        lat: Number,
        lng: Number
    },
    timestamp: Number,
    userId: String
});
exports.default = (0, mongoose_1.model)('Entry', EntrySchema);

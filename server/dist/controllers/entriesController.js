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
exports.deleteEntry = exports.createEntry = exports.getEntries = void 0;
const Entry_1 = __importDefault(require("../models/Entry"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fsPromises = fs_1.default.promises;
// Fetch all entries for a user (you can use userId from auth middleware)
const getEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const entries = yield Entry_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(entries);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getEntries = getEntries;
// Create a new entry
const createEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const file = req.file;
        const { lat, lng } = req.body;
        if (!file) {
            return res.status(400).json({ message: 'No photo uploaded' });
        }
        if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
            return res.status(400).json({ message: 'Invalid location data' });
        }
        const newEntry = new Entry_1.default({
            photoUri: `/uploads/${(_a = req.user) === null || _a === void 0 ? void 0 : _a.id}/${file.filename}`,
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            timestamp: Date.now(),
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
        });
        const saved = yield newEntry.save();
        res.status(201).json(saved);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createEntry = createEntry;
// Delete an entry
const deleteEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { id } = req.params;
        // 1) Find the entry
        const entry = yield Entry_1.default.findOne({ _id: id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!entry) {
            return res.status(404).json({ message: 'Not found or not your entry' });
        }
        // 2) If there's a photoUri, try to remove file and possibly folders
        if (entry.photoUri) {
            try {
                const uploadsDir = path_1.default.resolve(process.cwd(), 'uploads');
                // Turn the stored URI into a path and resolve it
                const cleaned = entry.photoUri.replace(/^\/+/, '');
                const photoPath = path_1.default.resolve(process.cwd(), cleaned);
                // Safety: ensure photoPath is inside uploadsDir
                const relativeToUploads = path_1.default.relative(uploadsDir, photoPath);
                // If relativeToUploads starts with '..' or is absolute, the file is outside uploads
                if (relativeToUploads.startsWith('..') || path_1.default.isAbsolute(relativeToUploads)) {
                    console.warn('Photo path is outside uploads folder — skipping file deletion:', photoPath);
                }
                else {
                    // Ensure the first path segment is the user id (i.e., uploads/<userId>/...)
                    const firstSegment = relativeToUploads.split(path_1.default.sep)[0];
                    if (firstSegment !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
                        console.warn('Photo does not belong to current user — skipping deletion:', relativeToUploads);
                    }
                    else {
                        // Delete the file (ignore ENOENT)
                        try {
                            yield fsPromises.unlink(photoPath);
                        }
                        catch (err) {
                            if (err.code === 'ENOENT') {
                                console.warn('Photo file already missing:', photoPath);
                            }
                            else {
                                console.error('Error deleting photo file:', err);
                            }
                        }
                        // Try to remove containing directory if it became empty (and then user dir)
                        try {
                            const dir = path_1.default.dirname(photoPath);
                            const files = yield fsPromises.readdir(dir);
                            if (files.length === 0) {
                                yield fsPromises.rmdir(dir); // removes only if empty
                                const userDir = path_1.default.dirname(dir);
                                const userFiles = yield fsPromises.readdir(userDir);
                                if (userFiles.length === 0) {
                                    yield fsPromises.rmdir(userDir);
                                }
                            }
                        }
                        catch (err) {
                            console.error('Error when trying to clean up folders:', err);
                        }
                    }
                }
            }
            catch (err) {
                console.error('Error handling file removal:', err);
            }
        }
        // 3) Delete DB record
        const result = yield Entry_1.default.deleteOne({ _id: id, userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Not found or not your entry' });
        }
        return res.status(204).end();
    }
    catch (err) {
        console.error('Error deleting entry:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteEntry = deleteEntry;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entriesController_1 = require("../controllers/entriesController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Multer config: saves files to /uploads/{userId}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                throw new Error('User ID missing');
            const dir = path_1.default.join(__dirname, '../../uploads', userId);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        }
        catch (err) {
            cb(err, '');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
// GET /api/entries
router.get('/', entriesController_1.getEntries);
// POST /api/entries
router.post('/', upload.single('photo'), entriesController_1.createEntry);
// DELETE /api/entries/:id
router.delete('/:id', entriesController_1.deleteEntry);
exports.default = router;

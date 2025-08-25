"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const ensureAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'No token' });
    }
    const token = auth.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { id: payload.id };
        next();
    }
    catch (_a) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.ensureAuth = ensureAuth;

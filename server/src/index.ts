import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import entriesRouter from './routes/entries';
import habitsRouter from './routes/habits';
import { ensureAuth } from './middleware/auth';
import authRouter from './routes/auth';
import path from 'path';

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/entries', ensureAuth, entriesRouter);
app.use('/api/habits', ensureAuth, habitsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
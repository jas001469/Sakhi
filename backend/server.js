import express from 'express';
import dotenv from 'dotenv'; 
import { connectDB } from './db/connectDB.js'; 
import authRoutes from './routes/auth.route.js';
import communityRoutes from './routes/community.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/community', communityRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port:', PORT);
});
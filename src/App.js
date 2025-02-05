import express from 'express';
import connectDb from '../Database/Database.js';
import dotenv from 'dotenv';
import userRouter from '../routers/user.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import applicationRouter from '../routers/application.router.js';
import uploadFileRouter from '../routers/upload.route.js';
import releaseRouter from '../routers/release.router.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PATCH', 'PUT', 'DELETE', 'POST'],
    exposedHeaders: ['Authorization'] 
}));

app.use(express.json());
app.use(cookieParser());

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
// console.log("Serving static files from:", path.join(__dirname, 'uploads'));

app.use('/api/user', userRouter);
app.use('/api/app', applicationRouter);
app.use('/api/release', releaseRouter);
app.use('/api/file', uploadFileRouter);

connectDb().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT_NUMBER, () => {
        console.log(`Server is connected to ${process.env.PORT_NUMBER || 3001}`);
    });
}).catch((error) => {
    console.log(error.message || error);
});

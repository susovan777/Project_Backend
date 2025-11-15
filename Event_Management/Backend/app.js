import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { profileRouter } from './routes/profileRoutes.js';
import { evenetRouter } from './routes/eventRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Event Management System!');
});

app.use('/api/profiles', profileRouter);
app.use('/api/events', evenetRouter);

export { app };

import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import evenetRouter from './routes/eventRoutes.js';
import profileRouter from './routes/profileRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database connection
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Event Management System!');
});

// Routes
app.use('/api/profiles', profileRouter);
app.use('/api/events', evenetRouter);

export default app;

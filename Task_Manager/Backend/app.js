import express from 'express';
import connectDB from './Config/db.js';

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Default root
app.use('/', (req, res) => {
  res.send('<h1>Welcome to the Task Manager App</h1>');
});

export default app;

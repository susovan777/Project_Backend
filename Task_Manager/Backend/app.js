import express from 'express';
import connectDB from './Config/db.js';
import taskRouter from './Routes/taskRoutes.js';

const app = express();
connectDB();

// --- Middleware ---
app.use(express.json()); // allows server to accept the json data

app.use('/api/tasks', taskRouter)

// Default root
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Task Manager App</h1>');
});


export default app;

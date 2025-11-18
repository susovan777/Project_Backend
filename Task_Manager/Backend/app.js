import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Default root
app.use('/', (req, res) => {
  res.send('<h1>Welcome to the Task Manager App</h1>');
});

export { app };

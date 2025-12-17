import express from 'express';
import cors from 'cors';
import connectDB from './Config/db.js';

const app = express();

connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from backend")
})

export default app;

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import videoRouter from './Routes/v1/index.js';
import { errorHandler, notFound } from './Middlewares/error.js';

const app = express();

// ============================================
// MIDDLEWARES (run in order from top to bottom)
// ============================================

// 1. Security headers
app.use(helmet());

// 2. Enable CORS, Allows frontend (React) on different port to call this API
app.use(cors());

// 3. Body parsers - Convert request body to JSON
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: true })); // Parses form data

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '👋 Hello from server',
    timestamp: new Date().toISOString(),
  });
});

// API v1 routes
app.use('/api/v1', videoRouter);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler - catches all undefined routes
app.use(notFound);

// Global error handler - catches all errors
app.use(errorHandler);

export default app;

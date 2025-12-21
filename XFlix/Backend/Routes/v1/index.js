// This file combines all v1 routes
import express from 'express';
import videoRoutes from './video.routes.js';

const router = express.Router();

// Mount video routes at api/v1/videos
router.use('/videos', videoRoutes);

// I can add more routes here:
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;

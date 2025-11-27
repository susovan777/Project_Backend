import express from 'express';
import { createProfile, getProfiles } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.route('/').get(getProfiles).post(createProfile);

export default profileRouter;

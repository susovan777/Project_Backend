import express from 'express';
import {
  createProfile,
  getProfiles,
  updateProfile,
} from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.route('/').get(getProfiles).post(createProfile);
profileRouter.route('/:id').put(updateProfile);

export default profileRouter;

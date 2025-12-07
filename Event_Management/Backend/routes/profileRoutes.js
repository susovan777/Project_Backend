import express from 'express';
import {
  createProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
} from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.route('/').get(getProfiles).post(createProfile);
profileRouter.route('/:id').put(updateProfile).delete(deleteProfile);

export default profileRouter;

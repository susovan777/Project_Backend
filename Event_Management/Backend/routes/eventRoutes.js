import express from 'express';
import {
  getAllEvents,
  createEvent,
  updateEvent,
  getEventsByProfile,
  deleteEvent,
} from '../controllers/eventController.js';

const evenetRouter = express.Router();

evenetRouter.route('/').post(createEvent).get(getAllEvents);
evenetRouter.route('/profiles/:profileId').get(getEventsByProfile);
evenetRouter.route('/:id').put(updateEvent).delete(deleteEvent);

export default evenetRouter;

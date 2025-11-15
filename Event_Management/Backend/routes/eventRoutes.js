import express from 'express';
import {
  createEvent,
  getEvents,
  updateEvent,
} from '../controllers/eventController.js';

const evenetRouter = express.Router();

evenetRouter.route('/').post(createEvent).get(getEvents);
evenetRouter.route('/:id').put(updateEvent);

export { evenetRouter };

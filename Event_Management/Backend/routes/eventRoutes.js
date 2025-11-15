import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController.js';

const evenetRouter = express.Router();

evenetRouter.route('/').post(createEvent).get(getEvents);

export { evenetRouter };

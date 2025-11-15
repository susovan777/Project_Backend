import { Event } from '../models/eventModel.js';

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, profiles, eventTimezone, startDateTime, endDateTime } =
      req.body;

    // Basic validation
    if (
      !title ||
      !profiles ||
      !eventTimezone ||
      !startDateTime ||
      !endDateTime
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required',
      });
    }

    // End date/time cannot be in the past relative to the selected start date/time.
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (startDate >= endDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Start date must be before end date',
      });
    }

    const event = await Event.create({
      title,
      profiles,
      eventTimezone,
      startDateTime: startDate,
      endDateTime: endDate,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: 'profiles',
      select: 'name',
    });
    res.status(200).json({
      status: 'success',
      events,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export { createEvent, getEvents };

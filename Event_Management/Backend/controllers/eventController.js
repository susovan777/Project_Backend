import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import Event from '../models/eventModel.js';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
const createEvent = async (req, res) => {
  try {
    const { title, profiles, eventTimezone, startDateTime, endDateTime } =
      req.body;

    const startDateUTC = dayjs.tz(startDateTime, eventTimezone).utc().toDate();
    const EndDateUTC = dayjs.tz(endDateTime, eventTimezone).utc().toDate();

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

    // Start date cannot be in the past
    if (startDateUTC < Date.now() || EndDateUTC < Date.now()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Date cannot be in past',
      });
    }

    // End date/time cannot be in the past relative to the selected start date/time.
    if (startDateUTC >= EndDateUTC) {
      return res.status(400).json({
        status: 'fail',
        message: 'End date/time must be after start date/time',
      });
    }

    const event = await Event.create({
      title,
      profiles,
      eventTimezone,
      startDateTime: startDateUTC,
      endDateTime: EndDateUTC,
      updateHistory: [],
    });

    // await Event.populate('profiles');

    res.status(201).json({ status: 'success', event });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Get all events for a profile
// @route   GET /api/events/profile/:profileId
// @access  Public
const getEventsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { eventTimezone } = req.query; // User's current timezone

    const events = await Event.find({ profiles: profileId })
      .populate('profiles')
      .sort({ startDate: 1 });

    // Convert dates to User's timezone
    const eventsWithTimezone = events.map((event) => {
      const eventObj = event.toObject();

      // Convert UTC dates to user's timezone
      if (eventTimezone) {
        eventObj.startDateDisplay = dayjs(event.startDate)
          .tz(eventTimezone)
          .format();
        eventObj.endDateDisplay = dayjs(event.endDate)
          .tz(eventTimezone)
          .format();
        eventObj.createdAtDisplay = dayjs(event.createdAt)
          .tz(eventTimezone)
          .format();
        eventObj.updatedAtDisplay = dayjs(event.updatedAt)
          .tz(eventTimezone)
          .format();
      }

      return eventObj;
    });

    if (eventsWithTimezone.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '🙅 No Events found',
      });
    }

    res.status(201).json({ status: 'success', events: eventsWithTimezone });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const { timezone } = req.query;

    const events = await Event.find()
      .populate('profiles')
      .sort({ startDate: 1 });

    // Convert dates to user's timezone if provided
    const eventsWithTimezone = events.map((event) => {
      const eventObj = event.toObject();

      if (timezone) {
        eventObj.startDateDisplay = dayjs(event.startDate)
          .tz(timezone)
          .format();
        eventObj.endDateDisplay = dayjs(event.endDate).tz(timezone).format();
        eventObj.createdAtDisplay = dayjs(event.createdAt)
          .tz(timezone)
          .format();
        eventObj.updatedAtDisplay = dayjs(event.updatedAt)
          .tz(timezone)
          .format();
      }

      return eventObj;
    });

    res.status(200).json({
      status: 'success',
      count: eventsWithTimezone.length,
      events: eventsWithTimezone,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Public
const updateEvent = async (req, res) => {
  try {
    const { title, profiles, eventTimezone, startDateTime, endDateTime } =
      req.body;
    const event = await Event.findById(req.params.id);

    // Track changes for update history
    const updateLog = [];

    // Convert new dates to UTC
    let startDateUTC, endDateUTC;

    if (startDateTime && eventTimezone) {
      startDateUTC = dayjs.tz(startDateTime, updateEvent).utc().toDate();

      if (event.startDateTime.getTime() !== startDateUTC.getTime()) {
        updateLog.push({
          field: 'startDateTime',
          oldValue: event.startDateTime,
          newValue: startDateUTC,
          updatedAt: new Date(),
          timezone: eventTimezone,
        });
      }
    }

    if (endDateTime && eventTimezone) {
      endDateUTC = dayjs.tz(endDateTime, eventTimezone).utc().toDate();

      if (event.endDateTime.getTime() !== endDateUTC.getTime()) {
        updateLog.push({
          field: 'endDateTime',
          oldValue: event.endDateTime,
          newValue: endDateUTC,
          updatedAt: new Date(),
          timezone: eventTimezone,
        });
      }
    }

    // Validation: End must be after Start
    const finalStartDate = startDateUTC || event.startDateTime;
    const finalEndDate = endDateUTC || event.endDateTime;

    if (finalEndDate <= finalStartDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'The end date/time must be after the start date/time.',
      });
    }

    // Updated start date cannot be in the past
    if (finalStartDate < Date.now() || finalEndDate < Date.now()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Updated date/time cannot be in the past',
      });
    }

    // Check for profile changes
    if (
      profiles &&
      JSON.stringify(profiles) !==
        JSON.stringify(event.profiles.map((p) => p.toString()))
    ) {
      updateLog.push({
        field: 'profiles',
        oldValue: event.profiles,
        newValue: profiles,
        updatedAt: new Date(),
        timezone: eventTimezone,
      });
    }

    // Check for title
    if (title !== event.title) {
      updateLog.push({
        field: 'title',
        oldValue: event.title,
        newValue: title,
        updatedAt: new Date(),
        timezone: eventTimezone,
      });
    }

    // Update event
    event.title = title || event.title;
    event.profiles = profiles || event.profiles;
    event.startDateTime = startDateUTC || event.startDateTime;
    event.endDateTime = endDateUTC || event.endDateTime;
    event.eventTimezone = eventTimezone || event.eventTimezone;

    // Add update logs to the Event model
    if (updateLog.length > 0) {
      event.updateHistory.push(...updateLog);
    }

    await event.save();

    res.status(200).json({
      status: 'Success',
      event,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Public
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({
        status: 'fail',
        message: 'Event not found',
      });
    }

    await event.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export {
  createEvent,
  getEventsByProfile,
  getAllEvents,
  updateEvent,
  deleteEvent,
};

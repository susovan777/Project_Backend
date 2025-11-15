import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    profiles: [
      {
        // This creates a relationship (reference) to the Profile model.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, 'Events must be assigned to at least one profile.'],
      },
    ],
    eventTimezone: {
      type: String,
      required: [true, 'Please pick a timezone for the event'],
    },
    startDateTime: {
      type: Date,
      required: [true, 'Please pick a event start date and time'],
    },
    endDateTime: {
      type: Date,
      required: [true, 'Please pick a event end date and time'],
    },
  },
  {
    timeStamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export { Event };

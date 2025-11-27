import mongoose from 'mongoose';

const updatedLogSchema = mongoose.Schema(
  {
    field: String,
    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    updatedAt: Date,
    timeZone: String,
  },
  { _id: false }
);

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
    updateHistory: [updatedLogSchema],
  },
  {
    timeStamps: true,
  }
);

// Validation: End date must be after start date
eventSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event ;

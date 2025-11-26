import mongoose from 'mongoose';

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a profile name'],
      trim: true,
      unique: true,
    },
    timezone: {
      type: String,
      default: 'America/New_York', // Default timezone
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };

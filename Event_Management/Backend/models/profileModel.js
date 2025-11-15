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
      required: [true, 'Please select a default timezone for the user'],
      default: 'IST',
    },
  },
  {
    timeStamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };

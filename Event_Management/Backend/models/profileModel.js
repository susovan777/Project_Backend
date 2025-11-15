import mongoose from 'mongoose';

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a profile name'],
      trim: true,
      unique: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };

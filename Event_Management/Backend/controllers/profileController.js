import { Profile } from '../models/profileModel.js';

const createProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const profile = await Profile.create({ name });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      status: 'fali',
      message: error.message,
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(201).json({
      status: 'success',
      profiles,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      status: 'fali',
      message: error,
    });
  }
};

export { createProfile, getProfiles };

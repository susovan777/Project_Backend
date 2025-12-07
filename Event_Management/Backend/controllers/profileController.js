import Profile from '../models/profileModel.js';

// @desc    Create a new profile
// @route   POST /api/profiles
// @access  Public
const createProfile = async (req, res) => {
  try {
    const { name, timeZone } = req.body;

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ name });
    if (existingProfile) {
      return res.status(400).json({
        status: 'fail',
        message: 'Profile with this name already exists',
      });
    }

    const profile = await Profile.create({
      name,
      timeZone: timeZone || 'America/New_York',
    });

    res.status(201).json({ status: 'success', data: profile });
  } catch (error) {
    res.status(500).json({
      status: 'fali',
      message: error.message,
    });
  }
};

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Public
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      count: profiles.length,
      data: profiles,
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

// @desc    Update profile timezone
// @route   PUT /api/profiles/:id
// @access  Public
const updateProfile = async (req, res) => {
  try {
    const { timezone } = req.body;

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { timezone },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fali',
      message: error.message,
    });
  }
};

// @desc    Delete profile
// @route   PUT /api/profiles/:id
// @access  Public
const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fali',
      message: error.message,
    });
  }
};

export { createProfile, getProfiles, updateProfile, deleteProfile };

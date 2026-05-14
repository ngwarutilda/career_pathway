const Profile = require('../models/Profile');
const User = require('../models/User');
const { generateRecommendations } = require('../utils/recommendationEngine');

// GET /api/profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate({
        path: 'recommendedPrograms',
        populate: { path: 'university', select: 'name city abbreviation' },
      });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/profile
const saveProfile = async (req, res) => {
  try {
    const { interests, favoriteSubjects, preferredFields, careerGoals, preferredCity } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { interests, favoriteSubjects, preferredFields, careerGoals, preferredCity },
      { new: true, upsert: true }
    );

    // Run recommendation engine after saving
    const recommendedIds = await generateRecommendations(profile);
    profile.recommendedPrograms = recommendedIds;
    profile.lastRecommendationDate = new Date();
    await profile.save();

    // Mark user's profile as completed
    await User.findByIdAndUpdate(req.user.id, { profileCompleted: true });

    res.json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, saveProfile };

const Profile = require('../models/Profile');
const User = require('../models/User');
const Program = require('../models/Program');
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
    console.log("Profile data received:", req.body);
    const { interests, favoriteSubjects, preferredFields, careerGoals, preferredCity, stream } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { interests, favoriteSubjects, preferredFields, careerGoals, preferredCity, stream },
      { new: true, upsert: true }
    );

    // Fetch all programs from database
    const programs = await Program.find({}).populate('university', 'name city abbreviation type');

    // Run recommendation engine with profile and programs
    const recommendedPrograms = await generateRecommendations(profile, programs);

    // Save recommended program IDs to profile
    profile.recommendedPrograms = recommendedPrograms.map(p => p._id);
    profile.lastRecommendationDate = new Date();
    await profile.save();

    // Mark user profile as completed
    await User.findByIdAndUpdate(req.user.id, { profileCompleted: true });

    res.json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.log("Profile save error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, saveProfile };
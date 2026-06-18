const Profile = require('../models/Profile');
const Program = require('../models/Program');
const { generateRecommendations } = require('../utils/recommendationEngine');

// GET /api/recommendations
const getRecommendations = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile)
      return res.status(404).json({ message: 'Profile not found. Please complete your profile first.' });

    // Fetch all programs from database
    const programs = await Program.find({}).populate('university', 'name city abbreviation type');

    // Run recommendation engine with profile and programs
    const recommendedPrograms = await generateRecommendations(profile, programs);

    // Save recommended program IDs to profile
    profile.recommendedPrograms = recommendedPrograms.map(p => p._id);
    profile.lastRecommendationDate = new Date();
    await profile.save();

    const populated = await profile.populate({
      path: 'recommendedPrograms',
      populate: { path: 'university', select: 'name city abbreviation type' },
    });

    res.json({ recommendations: populated.recommendedPrograms });
  } catch (error) {
    console.log("Recommendation error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRecommendations };
const Profile = require('../models/Profile');
const { generateRecommendations } = require('../utils/recommendationEngine');

// GET /api/recommendations
const getRecommendations = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile)
      return res.status(404).json({ message: 'Profile not found. Please complete your profile first.' });

    const recommendedIds = await generateRecommendations(profile);
    profile.recommendedPrograms = recommendedIds;
    profile.lastRecommendationDate = new Date();
    await profile.save();

    const populated = await profile.populate({
      path: 'recommendedPrograms',
      populate: { path: 'university', select: 'name city abbreviation' },
    });

    res.json({ recommendations: populated.recommendedPrograms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRecommendations };

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    interests: {
  type: [String],
},
favoriteSubjects: {
  type: [String],
},
preferredFields: {
  type: [String],
},
stream: {
  type: String,
  default: "",
},
    careerGoals: String,
    preferredCity: String,
    recommendedPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    lastRecommendationDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);

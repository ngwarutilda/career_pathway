const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    abbreviation: { type: String, trim: true },
    city: { type: String, required: true },
    region: String,
    type: { type: String, enum: ['public', 'private'], default: 'public' },
    website: String,
    description: String,
    logoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('University', universitySchema);

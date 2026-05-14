const mongoose = require('mongoose');

const concoursSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Government', 'Military & Police', 'Engineering', 'Medicine', 'Education', 'Private'],
    },
    description: String,
    requirements: [String],
    subjects: [String],
    applicationDeadline: Date,
    examDate: Date,
    location: String,
    availableSlots: Number,
    applicationLink: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Concours', concoursSchema);
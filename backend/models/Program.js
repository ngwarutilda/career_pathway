const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    faculty: String,
    degree: { type: String, enum: ['BSc', 'BA', 'BEng', 'LLB', 'MBBS', 'MSc', 'MA', 'PhD'], default: 'BSc' },
    duration: { type: Number, default: 3 },
    description: String,
    requiredSubjects: [String],
    preferredSubjects: [String],
    relatedCareers: [String],
    relatedFields: [String],
    admissionRequirements: String,
    tuitionFee: String,
    availableSlots: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Program', programSchema);

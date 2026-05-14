const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    field: { type: String, required: true },
    relatedSubjects: [String],
    relatedPrograms: [String],
    relatedUniversities: [String],
    jobProspects: String,
    averageSalary: String,
    skills: [String],
    icon: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
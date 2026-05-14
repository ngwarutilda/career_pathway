const Program = require('../models/Program');

/**
 * Score a single program against the student's profile.
 * Higher score = stronger match.
 */
const scoreProgram = (program, profile) => {
  let score = 0;

  const subjects = (profile.favoriteSubjects || []).map(s => s.toLowerCase());
  const fields   = (profile.preferredFields  || []).map(f => f.toLowerCase());
  const interests = (profile.interests       || []).map(i => i.toLowerCase());

  // +3 for each required subject the student has
  program.requiredSubjects.forEach((subject) => {
    if (subjects.includes(subject.toLowerCase())) score += 3;
  });

  // +2 for each preferred subject match
  program.preferredSubjects.forEach((subject) => {
    if (subjects.includes(subject.toLowerCase())) score += 2;
  });

  // +4 for each related field match (strongest signal)
  program.relatedFields.forEach((field) => {
    if (fields.includes(field.toLowerCase())) score += 4;
  });

  // +1 for each interest that appears in related careers
  program.relatedCareers.forEach((career) => {
    interests.forEach((interest) => {
      if (career.toLowerCase().includes(interest)) score += 1;
    });
  });

  return score;
};

/**
 * Main function: score all programs and return the top 10 IDs.
 */
const generateRecommendations = async (profile) => {
  try {
    const allPrograms = await Program.find({});

    const scored = allPrograms
      .map((program) => ({ program, score: scoreProgram(program, profile) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return scored.map((item) => item.program._id);
  } catch (error) {
    console.error('Recommendation engine error:', error.message);
    return [];
  }
};

module.exports = { generateRecommendations };

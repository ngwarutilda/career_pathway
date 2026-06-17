const scoreProgram = (program, profile) => {
  let score = 0;

  const subjects = profile.favoriteSubjects || [];
  const fields = profile.preferredFields || [];
  const interests = profile.interests || [];
  const stream = profile.stream || "";

  // Stream must match — if stream is set and does not match, score 0
  if (stream && program.stream && program.stream !== stream) {
    return 0;
  }

  // Required subjects match — +3 per match
  program.requiredSubjects?.forEach((subject) => {
    if (subjects.includes(subject)) score += 3;
  });

  // Preferred subjects match — +2 per match
  program.preferredSubjects?.forEach((subject) => {
    if (subjects.includes(subject)) score += 2;
  });

  // Related fields match — +4 per match
  program.relatedFields?.forEach((field) => {
    if (fields.includes(field)) score += 4;
  });

  // Related careers match interests — +1 per match
  program.relatedCareers?.forEach((career) => {
    if (interests.some((i) => career.toLowerCase().includes(i.toLowerCase()))) {
      score += 1;
    }
  });

  return score;
};

const generateRecommendations = async (profile, programs) => {
  const scored = programs.map((program) => ({
    program,
    score: scoreProgram(program, profile),
  }));

  // Filter out programs with score 0
  const filtered = scored.filter((item) => item.score > 0);

  // Sort by score descending
  filtered.sort((a, b) => b.score - a.score);

  // Return top 10
  return filtered.slice(0, 10).map((item) => item.program);
};

module.exports = { generateRecommendations, scoreProgram };
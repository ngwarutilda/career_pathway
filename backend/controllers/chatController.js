const Groq = require('groq-sdk');
const Program = require('../models/Program');
const Career = require('../models/Career');
const Concours = require('../models/Concours');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chat = async (req, res) => {
  try {
    console.log("Chat endpoint hit! Message:", req.body.message);
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    // Fetch data from database
   const programs = await Program.find({}).populate('university', 'name city').limit(20);
    const careers = await Career.find({});
    const concours = await Concours.find({ isActive: true });

    // Build context from database
    const programContext = programs.map(p =>
      `Program: ${p.name} | University: ${p.university?.name} | Faculty: ${p.faculty} | Degree: ${p.degree} | Duration: ${p.duration} years | Required Subjects: ${p.requiredSubjects?.join(', ')} | Admission: ${p.admissionRequirements} | Careers: ${p.relatedCareers?.join(', ')} | Tuition: ${p.tuitionFee}`
    ).join('\n');

    const careerContext = careers.map(c =>
      `Career: ${c.title} | Field: ${c.field} | Description: ${c.description} | Related Subjects: ${c.relatedSubjects?.join(', ')} | Salary: ${c.averageSalary} | Job Prospects: ${c.jobProspects}`
    ).join('\n');

    const concoursContext = concours.map(c =>
      `Concours: ${c.name} | School: ${c.school} | Category: ${c.category} | Requirements: ${c.requirements?.join(', ')} | Exam Date: ${c.examDate ? new Date(c.examDate).toLocaleDateString() : 'TBA'} | Deadline: ${c.applicationDeadline ? new Date(c.applicationDeadline).toLocaleDateString() : 'TBA'} | Location: ${c.location}`
    ).join('\n');

    const systemPrompt = `You are an academic advisor for Career Pathway, a platform helping Cameroonian secondary school students choose university programs and careers at the University of Buea. You have access to real data about programs, careers, and concours in Cameroon.

UNIVERSITY PROGRAMS IN THE DATABASE:
${programContext}

CAREERS IN THE DATABASE:
${careerContext}

CONCOURS IN THE DATABASE:
${concoursContext}

INSTRUCTIONS:
- Answer questions in a friendly, encouraging, and helpful way
- Focus on the Cameroonian educational context
- Use the database information above when answering questions about programs, careers, and concours
- For questions not covered by the database, use your general knowledge about Cameroon, careers, and education
- Keep responses concise and easy to understand for a secondary school student
- Always encourage students and help them make informed decisions
- If asked about programs, mention the required subjects and career opportunities
- Respond in the same language the student uses (English or French)`;

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
     model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content || 'I could not generate a response. Please try again.';
    res.json({ reply });

  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ message: 'Chat error', error: error.message });
  }
};

module.exports = { chat };
const University = require('../models/University');

const getAllUniversities = async (req, res) => {
  try {
    console.log("Fetching universities...");
    const { city, type } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (type) filter.type = type;
    const universities = await University.find(filter).sort({ name: 1 });
    console.log("Found:", universities.length);
    res.json({ count: universities.length, universities });
  } catch (error) {
    console.log("University error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ message: 'University not found' });
    res.json({ university });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json({ message: 'University created successfully', university });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!university) return res.status(404).json({ message: 'University not found' });
    res.json({ message: 'University updated successfully', university });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ message: 'University not found' });
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUniversities, getUniversityById, createUniversity, updateUniversity, deleteUniversity };
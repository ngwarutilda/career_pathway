const Concours = require('../models/Concours');

const getAllConcours = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    const concours = await Concours.find(filter).sort({ examDate: 1 });
    res.json({ count: concours.length, concours });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getConcoursById = async (req, res) => {
  try {
    const concours = await Concours.findById(req.params.id);
    if (!concours) return res.status(404).json({ message: 'Concours not found' });
    res.json({ concours });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createConcours = async (req, res) => {
  try {
    const concours = await Concours.create(req.body);
    res.status(201).json({ message: 'Concours created successfully', concours });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateConcours = async (req, res) => {
  try {
    const concours = await Concours.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!concours) return res.status(404).json({ message: 'Concours not found' });
    res.json({ message: 'Concours updated successfully', concours });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteConcours = async (req, res) => {
  try {
    const concours = await Concours.findByIdAndDelete(req.params.id);
    if (!concours) return res.status(404).json({ message: 'Concours not found' });
    res.json({ message: 'Concours deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllConcours, getConcoursById, createConcours, updateConcours, deleteConcours };

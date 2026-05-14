const Program = require('../models/Program');

const getAllPrograms = async (req, res) => {
  try {
    const { university, field, degree } = req.query;
    const filter = {};
    if (university) filter.university = university;
    if (degree) filter.degree = degree;
    if (field) filter.relatedFields = { $in: [field] };

    const programs = await Program.find(filter)
      .populate('university', 'name city abbreviation type')
      .sort({ name: 1 });
    res.json({ count: programs.length, programs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('university', 'name city abbreviation website type description');
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json({ program });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    const populated = await program.populate('university', 'name city abbreviation type');
    res.status(201).json({ message: 'Program created successfully', program: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('university', 'name city abbreviation type');
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json({ message: 'Program updated successfully', program });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram };
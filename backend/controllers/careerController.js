const Career = require('../models/Career');

const getAllCareers = async (req, res) => {
  try {
    const { field, search } = req.query;
    const filter = {};
    if (field) filter.field = field;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const careers = await Career.find(filter).sort({ title: 1 });
    res.json({ count: careers.length, careers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRecommendedCareers = async (req, res) => {
  try {
    const Profile = require('../models/Profile');
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    const interests = profile.interests || [];
    const subjects = profile.favoriteSubjects || [];
    const fields = profile.preferredFields || [];
    const careers = await Career.find({
      $or: [
        { field: { $in: fields } },
        { relatedSubjects: { $in: subjects } },
        { title: { $in: interests.map(i => new RegExp(i, 'i')) } },
      ],
    }).sort({ title: 1 });
    res.json({ count: careers.length, careers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ career });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ message: 'Career created successfully', career });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career updated successfully', career });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllCareers, getRecommendedCareers, getCareerById, createCareer, updateCareer, deleteCareer };

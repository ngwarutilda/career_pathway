const express = require('express');
const router = express.Router();
const { getAllUniversities, getUniversityById, createUniversity, updateUniversity, deleteUniversity } = require('../controllers/universityController');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, getAllUniversities);
router.get('/:id', protect, getUniversityById);
router.post('/', protectAdmin, createUniversity);
router.put('/:id', protectAdmin, updateUniversity);
router.delete('/:id', protectAdmin, deleteUniversity);

module.exports = router;
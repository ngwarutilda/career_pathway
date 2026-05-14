const express = require('express');
const router = express.Router();
const { getAllCareers, getRecommendedCareers, getCareerById, createCareer, updateCareer, deleteCareer } = require('../controllers/careerController');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

router.get('/recommended', protect, getRecommendedCareers);
router.get('/', protect, getAllCareers);
router.get('/:id', protect, getCareerById);
router.post('/', protectAdmin, createCareer);
router.put('/:id', protectAdmin, updateCareer);
router.delete('/:id', protectAdmin, deleteCareer);

module.exports = router;

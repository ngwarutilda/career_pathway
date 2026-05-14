const express = require('express');
const router = express.Router();
const { getAllConcours, getConcoursById, createConcours, updateConcours, deleteConcours } = require('../controllers/concoursController');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, getAllConcours);
router.get('/:id', protect, getConcoursById);
router.post('/', protectAdmin, createConcours);
router.put('/:id', protectAdmin, updateConcours);
router.delete('/:id', protectAdmin, deleteConcours);

module.exports = router;

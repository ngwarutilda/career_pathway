const express = require('express');
const router = express.Router();
const { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, getAllPrograms);
router.get('/:id', protect, getProgramById);
router.post('/', protectAdmin, createProgram);
router.put('/:id', protectAdmin, updateProgram);
router.delete('/:id', protectAdmin, deleteProgram);

module.exports = router;
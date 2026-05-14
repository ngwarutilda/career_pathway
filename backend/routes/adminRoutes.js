const express = require('express');
const router = express.Router();
const { getAllStudents, deleteStudent } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/students', protectAdmin, getAllStudents);
router.delete('/students/:id', protectAdmin, deleteStudent);

module.exports = router;
const express = require('express');
const router = express.Router();
const { signup, login, getMe, adminLogin, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);

module.exports = router;
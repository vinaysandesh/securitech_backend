// routes/userRoutes.js

const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect user profile route with authMiddleware
router.post('/profile', authMiddleware, getUserProfile);

module.exports = router;

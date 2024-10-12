// routes/userRoutes.js

const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { fetchAllUsers } = require('../models/userModel');

const router = express.Router();

// Protect user profile route with authMiddleware
router.post('/profile', authMiddleware, getUserProfile);
router.get('/fetch-users', authMiddleware,(req,res)=>{
    fetchAllUsers("", (err, userDetails) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
  
        // Send user details back to the client
        res.status(200).json({ users: userDetails });
      });
   
}   );

module.exports = router;

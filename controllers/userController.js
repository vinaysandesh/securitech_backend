const { jwtSecret } = require("../config/config");
const { getUserDetails } = require("../db/SelectQueries");
const { findUserById } = require("../models/userModel");
const jwt = require('jsonwebtoken');
// controllers/userController.js 
exports.getUserProfile = (req, res) => {
    // Example: Fetch user profile logic here
  console.log("---------")
    const token = req.header('Authorization'); // Assuming Bearer token
  
  // Verify and decode the token to extract userId
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
    
    const userId = decoded.id; // Assuming your JWT contains the user ID under 'id'

    // Call the database function to get user details using the userId
    findUserById(userId, (err, userDetails) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // Send user details back to the client
      res.status(200).json({ user: userDetails });
    });
  });
    // res.status(200).json({ message: 'User profile data' });
  };
  
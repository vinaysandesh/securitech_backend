// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const config = require('../config/config');

// User registration logic
exports.register = async (req, res) => {
 
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = User.findUserByEmail(email,name,async (err,row)=>{ 
    if (err ) {
      
      res.status(400).json({ message: 'Unknown error occured' });
   }else if(row.length>0){
    res.status(400).json({ message: 'Username/email already exists' });
   }else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.createUser({ name, email, password: hashedPassword }, function(err, user) {
      
      console.log("User inserted with ID:", err);
     
    }); 
    res.status(201).json({ message: 'User registered', user: newUser });
   }
    
   
  });
  } 

  exports.login = async (req, res) => { 
    console.log(req.body)
    const { email, password } = req.body;
    console.log(email);
    
    const user = User.findUserByEmail(email, email, async (err, row) => {
      console.log("row", row);
      if (err) {
        return res.status(400).json({ message: 'Unknown error occurred' });
      } else if (row.length === 0) {
        return res.status(400).json({ message: 'Username/email does not exist' });
      } else {
        if (!row || !(await bcrypt.compare(password, row[0].password))) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        // Generate Access Token
        const accessToken = jwt.sign({ id: row[0].id }, config.jwtSecret, { expiresIn: '2d' });
  
        // Generate Refresh Token (with a longer expiry)
        const refreshToken = jwt.sign({ id: row[0].id }, config.jwtRefreshSecret, { expiresIn: '7d' });
  
        // Optionally store refreshToken in DB for user or in-memory for later validation
        // User.updateRefreshToken(row[0].id, refreshToken); // Example logic
  
        return res.status(200).json({
          accessToken,
          refreshToken,
        });
      }
    });
  };
  
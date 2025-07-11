// controllers/userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
  // Destructure role from the request body
  const { name, email, password, role } = req.body;

  // Basic security check (in a real app, you'd have a more robust verification process for doctors)
  if (role && role === 'doctor') {
      console.log('Attempting to register a doctor.');
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with name, email, password, and role
    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Send role back
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// --- MODIFIED loginUser ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // <-- CRUCIAL: Send the user's role to the frontend
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// const getDoctors = async (req, res) => {
//   try {
   
//     const doctors = await User.find({ role: 'doctor' }).select('-password');
    
//     // If no doctors are found, it will correctly return an empty array []
//     res.json(doctors);

//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: 'Server Error: ' + error.message });
//   }
// };

const getDoctors = async (req, res) => {
  console.log("GET /api/users/doctors called"); // <== DEBUG LOG
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};


module.exports = { registerUser, loginUser, getDoctors };
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const jwt = require('jsonwebtoken'); // Import JWT library
const User = require('./User'); // Unified User model

const app = express();
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Middleware
app.use(cors({
  origin: 'https://your-frontend-url.onrender.com'
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Student Portal API is running');
});
// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Connect to MongoDB
mongoose.connect('mongodb+srv://ananthkumarnalluri456:Munna1234%24@studentportal.jhlvy7q.mongodb.net/?retryWrites=true&w=majority&appName=studentportal')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Signup route
app.post('/api/signup', async (req, res) => {
  const { Regno, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ Regno }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with default attendance and internals
    const user = new User({
      Regno,
      email,
      password,
      attendance: {}, // Default attendance will be generated
      internals: {},  // Default internals will be set
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        Regno: user.Regno,
        email: user.email,
        attendance: user.attendance,
        internals: user.internals,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { Regno, password } = req.body;

  try {
    // Find the user by Regno
    const user = await User.findOne({ Regno });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Regno or password' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Regno or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, Regno: user.Regno }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token, // Send the token to the client
      user: {
        Regno: user.Regno,
        email: user.email,
        attendance: user.attendance,
        internals: user.internals,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to fetch attendance data
app.get('/api/attendance', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'Regno attendance'); // Fetch only Regno and attendance for the logged-in user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to fetch internal marks data
app.get('/api/internals', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'Regno internals'); // Fetch only Regno and internals for the logged-in user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

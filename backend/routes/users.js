const express = require('express');
const User = require('../model/User'); // Assuming you have a User model
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);  // Send users as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;

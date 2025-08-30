const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig'); 

// Route to fetch gigs based on the user's email
router.get('/mygigs', async (req, res) => {
  const email = req.query.email;
  
  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find gigs that match the email
    const gigs = await Gig.find({ email });
    
    // Return the gigs
    res.json(gigs);
  } catch (error) {
    console.error('Error fetching gigs:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

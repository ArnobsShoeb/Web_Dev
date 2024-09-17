const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig.js'); 

// Route to post a gig
router.post('/postgig', async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Create a new gig
    const newGig = new Gig({
      title,
      description,
      price
    });

    await newGig.save();
    res.json({ success: true, message: 'Gig posted successfully!' });
  } catch (error) {
    console.error('Error posting gig:', error);
    res.status(500).json({ success: false, message: 'Failed to post gig. Please try again.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');

router.post('/postgig', async (req, res) => {
  const { title, description, price, email } = req.body;

  try {
    const newGig = new Gig({
      title,
      description,
      price,
      email, // Save the email of the user posting the gig
      orderCount: 0  // Set order count to 0 by default
    });

    await newGig.save();
    res.status(201).json({ message: 'Gig posted successfully!' });
  } catch (error) {
    console.error('Error posting gig:', error);
    res.status(500).json({ message: 'Failed to post gig' });
  }
});

module.exports = router;

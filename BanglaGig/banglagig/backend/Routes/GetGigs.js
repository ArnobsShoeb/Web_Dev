const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');

// Route to get gigs with pagination
router.get('/getgigs', async (req, res) => {
  try {
    const { page = 1, limit = 9, search = '' } = req.query;

    // Search for gigs based on the search term
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    // Fetch gigs with pagination
    const gigs = await Gig.find(query)
      .limit(limit * 1) // Limit the number of gigs
      .skip((page - 1) * limit) // Skip gigs for previous pages
      .exec();

    // Get total documents for the pagination calculation
    const count = await Gig.countDocuments(query);

    res.json({
      gigs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching gigs:', error);
    res.status(500).json({ success: false, message: 'Failed to load gigs. Please try again.' });
  }
});

module.exports = router;

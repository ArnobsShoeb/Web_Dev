// routes/GetGigs.js
const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const { decryptText } = require('../utils/CryptoService');

// GET /api/getgigs?page=1&limit=9&search=term   (search handled client-side)
router.get('/getgigs', async (req, res) => {
  try {
    const page  = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '9', 10);

    const gigs = await Gig.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Gig.countDocuments({});

    const gigsOut = gigs.map(g => ({
      _id: g._id,
      title: decryptText(g.title),
      description: decryptText(g.description),
      price: Number(decryptText(g.price)),
      email: decryptText(g.email),
      orderCount: g.orderCount,
      imageUrl: g.imageUrl ? `http://localhost:4000/${g.imageUrl}` : null,
      createdAt: g.createdAt,
    }));

    return res.json({
      gigs: gigsOut,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return res.status(500).json({ success: false, message: 'Failed to load gigs. Please try again.' });
  }
});

module.exports = router;

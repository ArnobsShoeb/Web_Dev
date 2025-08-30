// routes/FetchMyGigs.js
const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const { decryptText, sha256Hex } = require('../utils/CryptoService');

// GET /api/mygigs?email=someone@example.com
router.get('/mygigs', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const normalized = email.toLowerCase().trim();
    const emailHash = sha256Hex(normalized);

    const gigs = await Gig.find({ emailHash }).sort({ createdAt: -1 }).lean();

    const result = gigs.map(g => ({
      _id: g._id,
      title: decryptText(g.title),
      description: decryptText(g.description),
      price: Number(decryptText(g.price)),
      email: decryptText(g.email),
      orderCount: g.orderCount,
      imageUrl: g.imageUrl ? `http://localhost:4000/${g.imageUrl}` : null,
      createdAt: g.createdAt,
    }));

    return res.json(result);
  } catch (error) {
    console.error('Error fetching gigs:', error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;

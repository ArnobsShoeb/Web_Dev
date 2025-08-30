// routes/PostGig.js
const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const multer = require('multer');
const path = require('path');
const { encryptText, sha256Hex } = require('../utils/CryptoService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST /api/postgig
router.post('/postgig', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, email } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // normalize email for hashing
    const normalizedEmail = (email || '').toLowerCase().trim();
    const emailHash = sha256Hex(normalizedEmail);

    // encrypt fields (hybrid)
    const encTitle = encryptText(title);
    const encDesc  = encryptText(description);
    const encPrice = encryptText(String(price));
    const encEmail = encryptText(normalizedEmail);

    const newGig = new Gig({
      title: encTitle,
      description: encDesc,
      price: encPrice,
      email: encEmail,
      emailHash,
      orderCount: 0,
      imageUrl,
    });

    await newGig.save();
    return res.status(201).json({ message: 'Gig posted successfully!' });
  } catch (error) {
    console.error('Error posting gig:', error);
    return res.status(500).json({ message: 'Failed to post gig' });
  }
});

module.exports = router;

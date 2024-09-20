const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Post gig route with file upload
router.post('/postgig', upload.single('image'), async (req, res) => {
  const { title, description, price, email } = req.body;
  const imageUrl = req.file ? req.file.path : null;  // Get file path if uploaded

  try {
    const newGig = new Gig({
      title,
      description,
      price,
      email,
      orderCount: 0,
      imageUrl  // Save image URL
    });

    await newGig.save();
    res.status(201).json({ message: 'Gig posted successfully!' });
  } catch (error) {
    console.error('Error posting gig:', error);
    res.status(500).json({ message: 'Failed to post gig' });
  }
});

module.exports = router;

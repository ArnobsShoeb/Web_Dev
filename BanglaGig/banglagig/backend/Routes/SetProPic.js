const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Route to upload profile picture
router.post('/setpropic', upload.single('profilePicture'), async (req, res) => {
    const email = req.body.email;
    const profilePicturePath = path.join('uploads', req.file.filename);

    try {
        const user = await User.findOneAndUpdate({ email: email }, { profilePicture: profilePicturePath }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile picture uploaded successfully', user });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to fetch user data
router.get('/fetchuserdata', async (req, res) => {
    const email = req.query.email;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

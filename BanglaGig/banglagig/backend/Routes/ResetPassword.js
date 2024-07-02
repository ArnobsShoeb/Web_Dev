const express = require('express');
const router = express.Router();
const Token = require('../models/Token'); // Token model
const User = require('../models/User'); // User model

// POST /api/reset-password
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify the OTP
        const token = await Token.findOne({ email, otp });
        if (!token) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        
        const tokenExpireTime = new Date(token.date).getTime() + token.expireIn * 60000; // Convert minutes to milliseconds
        if (Date.now() > tokenExpireTime) {
            return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' });
        }

        // Update the user's password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }
        user.password = newPassword;
        await user.save();

        // Mark token as verified and delete it
        token.verified = true;
        await token.remove();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
    }
});

module.exports = router;

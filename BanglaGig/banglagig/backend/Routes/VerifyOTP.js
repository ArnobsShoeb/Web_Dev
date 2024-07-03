const express = require('express');
const router = express.Router();
const Token = require('../models/Token'); 
const User = require('../models/User'); 

// POST /api/reset-password
router.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify the OTP
        const token = await Token.findOne({ email, otp });
        if (!token) {
            return res.status(400).json({ message: 'Invalid OTP.' });
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
        await token.deleteOne();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
    }
});

module.exports = router;
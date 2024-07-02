const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify the OTP
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        // Check if the OTP matches (you need to implement the logic to store and verify OTPs)
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
    }
});

module.exports = router;

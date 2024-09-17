const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

router.post('/topup', async (req, res) => {
    const { email, amount } = req.body;

    if (!email || !amount) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's balance
        user.balance = (user.balance || 0) + parseFloat(amount);

        // Save the updated user data
        await user.save();

        return res.status(200).json({ message: 'Top-up successful', balance: user.balance });
    } catch (error) {
        return res.status(500).json({ message: 'Error processing top-up' });
    }
});

module.exports = router;

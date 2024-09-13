// backend/routes/FetchUserDetails.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Payment = require('../models/Payment');

// Fetch user details
router.get("/fetchuserdetails", async (req, res) => {
    const email = req.query.email;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Handle payment submission
router.post('/submitpayment', async (req, res) => {
    const { senderEmail, recipientEmail, amount, sendVia, bankName, phoneNumber, accountNumber } = req.body;

    try {
        // Fetch sender user details
        const sender = await User.findOne({ email: senderEmail });
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        // Check for sufficient balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct balance from sender
        sender.balance -= amount;
        await sender.save();

        // Fetch recipient user details
        const recipient = await User.findOne({ email: recipientEmail });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Add balance to recipient's account
        recipient.balance += parseFloat(amount);
        await recipient.save();

        // Save payment details
        const payment = new Payment({
            senderEmail,
            recipientEmail,
            amount,
            sendVia,
            bankName: sendVia === 'Bank Transfer' ? bankName : null,
            phoneNumber: sendVia !== 'Bank Transfer' ? phoneNumber : null,
            accountNumber: sendVia === 'Bank Transfer' ? accountNumber : null,
        });
        await payment.save();

        res.json({ success: true, message: 'Payment successful and balance updated for recipient' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Top-up balance
router.post('/topup', async (req, res) => {
    const { email, amount } = req.body;

    if (!email || !amount) {
        return res.status(400).json({ message: 'Email and amount are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.balance += parseFloat(amount);
        await user.save();

        res.json({ success: true, balance: user.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

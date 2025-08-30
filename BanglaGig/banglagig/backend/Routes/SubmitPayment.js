const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Payment = require('../models/Payment'); // Import your Payment model

router.post('/submitpayment', async (req, res) => {
    const { senderEmail, recipientEmail, amount, sendVia, bankName, phoneNumber, accountNumber } = req.body;

    if (!senderEmail || !recipientEmail || !amount || !sendVia) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Find the sender and recipient by email
        const sender = await User.findOne({ email: senderEmail });
        const recipient = await User.findOne({ email: recipientEmail });

        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Check if the sender has enough balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the amount from the sender's balance
        sender.balance -= amount;

        // Add the amount to the recipient's balance
        recipient.balance = (recipient.balance || 0) + parseFloat(amount);

        // Save the updated sender and recipient data
        await sender.save();
        await recipient.save();

        // Save the payment details in the Payment collection
        const payment = new Payment({
            senderEmail,
            recipientEmail,
            amount,
            sendVia,
            bankName: sendVia === 'Bank Transfer' ? bankName : null,
            phoneNumber: sendVia !== 'Bank Transfer' ? phoneNumber : null,
            accountNumber: sendVia === 'Bank Transfer' ? accountNumber : null,
        });

        await payment.save(); // Save the payment in the database

        return res.status(200).json({ message: 'Payment successful', senderBalance: sender.balance });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error processing payment' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');  // Assuming this is the path to your Payment model

// Middleware to get the logged-in user's email (assuming you're using localStorage for storing user info)
const getLoggedInUserEmail = (req) => {
    const user = req.user; // If you're using authentication middleware
    return user.email;
};

// Route to get payment history of the logged-in user
router.get('/paymenthistory', async (req, res) => {
    try {
        const userEmail = getLoggedInUserEmail(req);
        console.log("Fetching payment history for:", userEmail);

        if (!userEmail) {
            return res.status(400).json({ message: 'User email not provided' });
        }

        const payments = await Payment.find({
            $or: [
                { senderEmail: userEmail },
                { recipientEmail: userEmail }
            ]
        });

        console.log("Payments found:", payments);
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: 'Failed to fetch payment history' });
    }
});

module.exports = router;

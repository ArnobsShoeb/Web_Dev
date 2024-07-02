const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Token = require('../models/Token'); // Import your Token model

// POST /api/send-reset-mail
router.post('/send-reset-mail', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found.' }); 
        }

        // Generate OTP 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the OTP to the user (you can store it in the database, here for simplicity we assume it's stored directly)
        user.otp = otp;
        await user.save();

        // Create a token for password reset
        const token = new Token({
            email: user.email,
            otp,
            expireIn: 3600, // Token expiration time in seconds (adjust as needed)
        });
        await token.save();

        // Create a transporter for sending email
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user:'arnobshoeb@gmail.com',
                pass:'akwi cnsk okzn cwkf',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP code is ${otp}`,
        };

        // Send mail
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        res.json({ success: true, message: 'OTP has been sent to your email.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
});

module.exports = router;

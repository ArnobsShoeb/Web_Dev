// routes/SubmitPayment.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Payment = require('../models/Payment');

const { encryptText, sha256Hex } = require('../utils/CryptoService');

router.post('/submitpayment', async (req, res) => {
  const {
    senderEmail,
    recipientEmail,
    amount,
    sendVia,
    bankName,
    phoneNumber,
    accountNumber
  } = req.body;

  if (!senderEmail || !recipientEmail || amount == null || !sendVia) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const senderNorm    = senderEmail.toLowerCase().trim();
    const recipientNorm = recipientEmail.toLowerCase().trim();
    const senderHash    = sha256Hex(senderNorm);
    const recipientHash = sha256Hex(recipientNorm);

    const sender = await User.findOne({ emailHash: senderHash });
    const recipient = await User.findOne({ emailHash: recipientHash });

    if (!sender)    return res.status(404).json({ message: 'Sender not found' });
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (sender.balance < amt) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance   -= amt;
    recipient.balance = (recipient.balance || 0) + amt;

    await sender.save();
    await recipient.save();

    const nowIso = new Date().toISOString();

    const payment = new Payment({
      senderEmail:     encryptText(senderNorm),
      recipientEmail:  encryptText(recipientNorm),
      amount:          encryptText(String(amt)),
      sendVia:         encryptText(sendVia),
      bankName:        bankName ? encryptText(bankName) : null,
      phoneNumber:     phoneNumber ? encryptText(phoneNumber) : null,
      accountNumber:   accountNumber ? encryptText(accountNumber) : null,
      date:            encryptText(nowIso),
      senderEmailHash:    senderHash,
      recipientEmailHash: recipientHash,
    });

    await payment.save();

    return res.status(200).json({
      message: 'Payment successful',
      senderBalance: sender.balance
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error processing payment' });
  }
});

module.exports = router;

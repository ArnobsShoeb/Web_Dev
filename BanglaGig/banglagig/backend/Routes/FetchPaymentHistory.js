// routes/FetchPaymentHistory.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User'); // only used if you have auth middleware + JWT userId
const { decryptText, sha256Hex, decrypt } = require('../utils/CryptoService'); 
// ^ if your User fields use small-field RSA decrypt(), keep it; otherwise you can remove `decrypt`

// Helper to get the logged-in user's email
async function resolveUserEmail(req) {
  // 1) Prefer explicit query param
  if (req.query?.email) return String(req.query.email).trim();

  // 2) Or a custom header
  if (req.headers['x-user-email']) return String(req.headers['x-user-email']).trim();

  // 3) If you have auth middleware that sets req.user.userId, fetch & decrypt from DB
  if (req.user?.userId) {
    const user = await User.findById(req.user.userId).lean();
    if (user?.email) {
      // If your User model uses small-field RSA helpers:
      try { return decrypt(user.email).trim(); } catch { /* fall through */ }
      // If you instead stored with encryptText for user.email, use:
      // return decryptText(user.email).trim();
    }
  }
  return null;
}

// GET /api/paymenthistory?email=someone@example.com
router.get('/paymenthistory', async (req, res) => {
  try {
    const emailRaw = await resolveUserEmail(req);
    if (!emailRaw) {
      return res.status(400).json({ message: 'User email not provided' });
    }

    const normalized = emailRaw.toLowerCase().trim();
    const emailHash = sha256Hex(normalized);

    // Find payments where the user is sender or recipient (match by hash)
    const payments = await Payment.find({
      $or: [
        { senderEmailHash: emailHash },
        { recipientEmailHash: emailHash }
      ]
    })
    // Sort newest first; date is encrypted, so sort by _id desc as a reasonable proxy
    .sort({ _id: -1 })
    .lean();

    // Decrypt each payment for response
    const out = payments.map(p => ({
      _id: p._id,
      senderEmail:     decryptText(p.senderEmail),
      recipientEmail:  decryptText(p.recipientEmail),
      amount:          Number(decryptText(p.amount)),
      sendVia:         decryptText(p.sendVia),
      bankName:        p.bankName ? decryptText(p.bankName) : null,
      phoneNumber:     p.phoneNumber ? decryptText(p.phoneNumber) : null,
      accountNumber:   p.accountNumber ? decryptText(p.accountNumber) : null,
      date:            decryptText(p.date),
    }));

    return res.status(200).json(out);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return res.status(500).json({ message: 'Failed to fetch payment history' });
  }
});

module.exports = router;

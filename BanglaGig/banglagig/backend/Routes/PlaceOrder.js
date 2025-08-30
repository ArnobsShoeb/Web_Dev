// routes/PlaceOrder.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Gig = require('../models/Gig');
const { encryptText, decryptText, sha256Hex } = require('../utils/CryptoService');

// POST /api/placeorder
router.post('/placeorder', async (req, res) => {
  const { orderDeadline, gigId } = req.body;

  // buyer email comes from header or body (fallback)
  const buyerEmailHeader = req.headers['buyer-email'];
  const buyerEmailBody = req.body.buyerEmail;
  const buyerEmailRaw = (buyerEmailHeader || buyerEmailBody || '').trim().toLowerCase();

  if (!buyerEmailRaw) {
    return res.status(400).json({ message: 'Buyer email is required' });
  }
  if (!orderDeadline || !gigId) {
    return res.status(400).json({ message: 'orderDeadline and gigId are required' });
  }

  try {
    const gig = await Gig.findById(gigId).lean();
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    // Decrypt seller email from the gig
    const sellerEmailPlain = (decryptText(gig.email) || '').trim().toLowerCase();
    if (!sellerEmailPlain) {
      return res.status(500).json({ message: 'Seller email missing on gig' });
    }

    // Normalize & hash for lookups
    const buyerEmailHash  = sha256Hex(buyerEmailRaw);
    const sellerEmailHash = sha256Hex(sellerEmailPlain);

    // Encrypt order fields (store as strings)
    const nowIso = new Date().toISOString();
    const encBuyerEmail   = encryptText(buyerEmailRaw);
    const encSellerEmail  = encryptText(sellerEmailPlain);
    const encOrderedDate  = encryptText(nowIso);
    const encOrderDeadline= encryptText(new Date(orderDeadline).toISOString());

    const order = new Order({
      buyerEmail: encBuyerEmail,
      sellerEmail: encSellerEmail,
      orderedDate: encOrderedDate,
      orderDeadline: encOrderDeadline,
      buyerEmailHash,
      sellerEmailHash,
      gigInfo: gigId
    });

    await order.save();
    return res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

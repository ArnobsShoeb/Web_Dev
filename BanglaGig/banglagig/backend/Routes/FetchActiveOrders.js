// routes/FetchActiveOrders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Gig = require('../models/Gig');
const { decryptText, sha256Hex } = require('../utils/CryptoService');

// POST /api/myorders  { userEmail, usertype }
router.post('/myorders', async (req, res) => {
  const { userEmail, usertype } = req.body;

  if (!userEmail || !usertype) {
    return res.status(400).json({ message: 'userEmail and usertype are required' });
  }

  try {
    const normalized = userEmail.trim().toLowerCase();
    const emailHash = sha256Hex(normalized);

    let orders;
    if (usertype === 'Seller') {
      orders = await Order.find({ sellerEmailHash: emailHash })
        .populate('gigInfo')
        .lean();
    } else if (usertype === 'Buyer') {
      orders = await Order.find({ buyerEmailHash: emailHash })
        .populate('gigInfo')
        .lean();
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const out = orders.map(o => {
      // Decrypt order fields
      const buyerEmail   = decryptText(o.buyerEmail);
      const sellerEmail  = decryptText(o.sellerEmail);
      const orderedDate  = decryptText(o.orderedDate);
      const orderDeadline= decryptText(o.orderDeadline);

      // Decrypt gigInfo fields (since populated doc contains encrypted strings)
      let gig = null;
      if (o.gigInfo) {
        const g = o.gigInfo;
        gig = {
          _id: g._id,
          title:        decryptText(g.title),
          description:  decryptText(g.description),
          price: Number(decryptText(g.price)),
          email:        decryptText(g.email),
          orderCount:   g.orderCount,
          imageUrl:     g.imageUrl ? `http://localhost:4000/${g.imageUrl}` : null,
          createdAt:    g.createdAt,
        };
      }

      return {
        _id: o._id,
        buyerEmail,
        sellerEmail,
        orderedDate,
        orderDeadline,
        gigInfo: gig
      };
    });

    return res.json({ orders: out });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Adjust path as needed
const Gig = require('../models/Gig'); // Import the Gig model

// Route to fetch active orders
router.post('/myorders', async (req, res) => {
  const { userEmail, usertype } = req.body;

  try {
    let orders;
    if (usertype === 'Seller') {
      orders = await Order.find({ sellerEmail: userEmail }).populate('gigInfo');
    } else if (usertype === 'Buyer') {
      orders = await Order.find({ buyerEmail: userEmail }).populate('gigInfo');
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

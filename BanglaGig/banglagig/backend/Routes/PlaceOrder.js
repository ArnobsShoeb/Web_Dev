const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Import the Order model
const Gig = require('../models/Gig'); // Import the Gig model

// Route to place an order
router.post('/placeorder', async (req, res) => {
  const { orderDeadline, gigId } = req.body;

  // Retrieve the buyer's email from a header (sent from the frontend)
  const buyerEmail = req.headers['buyer-email'];

  try {
    // Check if the gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Create a new order
    const order = new Order({
      buyerEmail,
      sellerEmail: gig.email, // Use the seller's email from the gig
      orderDeadline,
      gigInfo: gigId
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerEmail: {
    type: String,
    required: true
  },
  sellerEmail: {
    type: String,
    required: true
  },
  orderedDate: {
    type: Date,
    default: Date.now
  },
  orderDeadline: {
    type: Date,
    required: true
  },
  gigInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

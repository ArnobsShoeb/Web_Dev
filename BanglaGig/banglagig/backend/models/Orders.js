// models/Orders.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Encrypted with encryptText(...)
  buyerEmail:   { type: String, required: true }, // encrypted
  sellerEmail:  { type: String, required: true }, // encrypted
  orderedDate:  { type: String, required: true }, // encrypted ISO string
  orderDeadline:{ type: String, required: true }, // encrypted ISO string

  // Deterministic hashes for lookups
  buyerEmailHash:  { type: String, required: true, index: true },
  sellerEmailHash: { type: String, required: true, index: true },

  // Reference
  gigInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true }
});

module.exports = mongoose.model('Order', orderSchema);

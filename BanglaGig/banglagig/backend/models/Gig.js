// models/Gig.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const gigSchema = new Schema({
  // Encrypted (hybrid) JSON strings
  title:       { type: String, required: true }, // encryptText(...)
  description: { type: String, required: true }, // encryptText(...)
  price:       { type: String, required: true }, // encryptText(String(number))
  email:       { type: String, required: true }, // encryptText(normalizedEmail)

  // Deterministic hash for lookups (seller's email)
  emailHash:   { type: String, required: true, index: true },

  // Plain fields
  createdAt:   { type: Date, default: Date.now },
  orderCount:  { type: Number, default: 0 },
  imageUrl:    { type: String }, // stored path like "uploads/123.jpg"
});

module.exports = mongoose.model('Gig', gigSchema);

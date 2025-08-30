// models/Payment.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  // Encrypted fields (hybrid RSA-OAEP + AES-GCM via encryptText)
  senderEmail:     { type: String, required: true }, // encryptText(normalized sender email)
  recipientEmail:  { type: String, required: true }, // encryptText(normalized recipient email)
  amount:          { type: String, required: true }, // encryptText(String(amount))
  sendVia:         { type: String, required: true }, // encryptText(sendVia)
  bankName:        { type: String, default: null },  // encryptText(...) or null
  phoneNumber:     { type: String, default: null },  // encryptText(...) or null
  accountNumber:   { type: String, default: null },  // encryptText(...) or null
  date:            { type: String, required: true }, // encryptText(ISO date string)

  // Deterministic hashes for lookups/filtering
  senderEmailHash:    { type: String, required: true, index: true },
  recipientEmailHash: { type: String, required: true, index: true },
});

module.exports = mongoose.model('Payment', PaymentSchema);

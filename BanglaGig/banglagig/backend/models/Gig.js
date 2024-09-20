const mongoose = require('mongoose');
const { Schema } = mongoose;

const gigSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  imageUrl: {  // New field for storing image URL
    type: String,
  }
});

module.exports = mongoose.model('Gig', gigSchema);

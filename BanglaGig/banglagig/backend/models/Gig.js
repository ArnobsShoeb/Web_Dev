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
  email: {   // Add email of the user who posted the gig
    type: String,
    required: true,
  },
  orderCount: {      // Add order count for the gig
    type: Number,
    default: 0,      // Default value is 0 when a gig is first posted
  }
});

module.exports = mongoose.model('Gig', gigSchema);

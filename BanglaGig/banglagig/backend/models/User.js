const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  // These will store encrypted (base64) strings
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,   // encrypted email, not plaintext
  },
  usertype: {
    type: String,
    required: true,
  },

  // Deterministic hash of email for lookups (instead of plaintext unique email)
  emailHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  // Bcrypt hashed + salted password
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: null
  },
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);

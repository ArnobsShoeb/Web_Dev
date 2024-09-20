
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    expireIn: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Token', TokenSchema);

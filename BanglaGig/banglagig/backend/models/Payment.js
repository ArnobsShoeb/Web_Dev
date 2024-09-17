const mongoose = require('mongoose');

const { Schema } = mongoose;

const PaymentSchema = new Schema({
    senderEmail: {
        type: String,
        required: true,
    },
    recipientEmail: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    sendVia: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    accountNumber: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);

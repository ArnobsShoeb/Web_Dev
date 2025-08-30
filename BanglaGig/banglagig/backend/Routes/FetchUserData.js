// routes/FetchUserData.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Payment = require("../models/Payment");

// Use decrypt for user fields (small-field RSA), and encryptText/decryptText for payments
const { encryptText, decryptText, sha256Hex, decrypt } = require("../utils/CryptoService");

// GET /api/fetchuserdata?email=...
router.get("/fetchuserdata", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // find by hashed email (since User.email is encrypted)
    const normalized = email.toLowerCase().trim();
    const emailHash = sha256Hex(normalized);

    const user = await User.findOne({ emailHash }).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Decrypt user fields with small-field RSA decrypt()
    const payload = {
      _id: user._id,
      firstname: decrypt(user.firstname),
      lastname:  decrypt(user.lastname),
      email:     decrypt(user.email),
      usertype:  decrypt(user.usertype),
      profilePicture: user.profilePicture,
      balance: user.balance,
      date: user.date,
    };

    return res.json(payload);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// POST /api/submitpayment
router.post("/submitpayment", async (req, res) => {
  const {
    senderEmail,
    recipientEmail,
    amount,
    sendVia,
    bankName,
    phoneNumber,
    accountNumber,
  } = req.body;

  if (!senderEmail || !recipientEmail || amount == null || !sendVia) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const senderNorm = senderEmail.toLowerCase().trim();
    const recipientNorm = recipientEmail.toLowerCase().trim();

    const senderHash = sha256Hex(senderNorm);
    const recipientHash = sha256Hex(recipientNorm);

    // find users by emailHash
    const sender = await User.findOne({ emailHash: senderHash });
    if (!sender) return res.status(404).json({ message: "Sender not found" });

    const recipient = await User.findOne({ emailHash: recipientHash });
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // balance check & update (balance is plaintext number in User model)
    if (sender.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    sender.balance -= amt;
    recipient.balance = (recipient.balance || 0) + amt;

    await sender.save();
    await recipient.save();

    // Save encrypted payment record (hybrid encryptText)
    const nowIso = new Date().toISOString();

    const payment = new Payment({
      senderEmail: encryptText(senderNorm),
      recipientEmail: encryptText(recipientNorm),
      amount: encryptText(String(amt)),
      sendVia: encryptText(sendVia),
      bankName: bankName ? encryptText(bankName) : null,
      phoneNumber: phoneNumber ? encryptText(phoneNumber) : null,
      accountNumber: accountNumber ? encryptText(accountNumber) : null,
      date: encryptText(nowIso),
      senderEmailHash: senderHash,
      recipientEmailHash: recipientHash,
    });

    await payment.save();

    return res.json({
      success: true,
      message: "Payment successful and balances updated",
      senderBalance: sender.balance,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// POST /api/topup
router.post("/topup", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || amount == null) {
    return res.status(400).json({ message: "Email and amount are required" });
  }

  try {
    const normalized = email.toLowerCase().trim();
    const emailHash = sha256Hex(normalized);

    const user = await User.findOne({ emailHash });
    if (!user) return res.status(404).json({ message: "User not found" });

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    user.balance = (user.balance || 0) + amt;
    await user.save();

    return res.json({ success: true, balance: user.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

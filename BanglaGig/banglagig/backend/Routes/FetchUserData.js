// routes/FetchUserData.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");


const { decrypt, sha256Hex } = require("../utils/CryptoService");


router.get("/fetchuserdata", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // 1) Normalize exactly like register/login
    const normalizedEmail = email.toLowerCase().trim();

    // 2) Deterministic hash to look up (since email in DB is RSA-encrypted)
    const emailHash = sha256Hex(normalizedEmail);

    // 3) Find by emailHash
    const user = await User.findOne({ emailHash }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4) Decrypt fields for viewing (never return password)
    const payload = {
      _id: user._id,
      firstname: decrypt(user.firstname),
      lastname:  decrypt(user.lastname),
      email:     decrypt(user.email),
      usertype:  decrypt(user.usertype),
      profilePicture: user.profilePicture,
      balance: user.balance,
      date: user.date
    };

    return res.json(payload);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

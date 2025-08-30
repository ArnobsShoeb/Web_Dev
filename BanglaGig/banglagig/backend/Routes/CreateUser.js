const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { encrypt, sha256Hex } = require("../utils/CryptoService");

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("firstname").notEmpty(),
    body("lastname").notEmpty(),
    body("usertype").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstname, lastname, email, password, usertype } = req.body;

      // Normalize email
      const normalizedEmail = email.toLowerCase().trim();

      // Hash for lookups
      const emailHash = sha256Hex(normalizedEmail);

      // Encrypt user info
      const encFirst = encrypt(firstname);
      const encLast  = encrypt(lastname);
      const encEmail = encrypt(normalizedEmail);
      const encType  = encrypt(usertype);

      // Hash+salt password
      const passwordHash = await bcrypt.hash(password, 12);

      await User.create({
        firstname: encFirst,
        lastname: encLast,
        email: encEmail,
        emailHash,
        password: passwordHash,
        usertype: encType,
      });

      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        return res.status(400).json({ success: false, errors: "Email already registered" });
      }
      return res.status(500).json({ success: false });
    }
  }
);

module.exports = router;

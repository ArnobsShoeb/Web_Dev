// routes/LoginUser.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// ✅ match your file names exactly (case-sensitive)
const { decrypt } = require("../utils/CryptoService");
const { checkCredentials } = require("../utils/AuthUser");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_env";

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Use the separate credential-check function
      const user = await checkCredentials(email, password);
      if (!user) {
        return res.status(400).json({ errors: "Invalid Email or Password" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

      // Decrypt fields for response
      const firstname = decrypt(user.firstname);
      const lastname  = decrypt(user.lastname);
      const emailDec  = decrypt(user.email);
      const usertype  = decrypt(user.usertype);

      return res.json({
        success: true,
        token,
        user: { firstname, lastname, email: emailDec, usertype }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }
  }
);

module.exports = router;

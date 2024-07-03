const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');


router.post(
    "/loginuser",
    [body("email").isEmail(), body("password").isLength({ min: 5 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
  
      try {
        let userData = await User.findOne({ email });
        if (!userData) {
          return res.status(400).json({ errors: "Invalid Email" });
        }
        if (req.body.password !== userData.password) {
          return res.status(400).json({ errors: "Invalid Password" });
        }

        const token = jwt.sign({ userId: userData._id }, 'secret_key', { expiresIn: '1h' });
  
        return res.json({ success: true, token: token, firstname: userData.firstname });

      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  );
  module.exports = router;
  
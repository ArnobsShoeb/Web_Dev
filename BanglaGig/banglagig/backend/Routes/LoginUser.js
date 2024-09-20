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
        const { email, password } = req.body;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email" });
            }

            if (password !== userData.password) {
                return res.status(400).json({ errors: "Invalid Password" });
            }

            const token = jwt.sign(
                { userId: userData._id, usertype: userData.usertype },
                'secret_key', // Replace with a secure key in production
                { expiresIn: '1h' }
            );

            return res.json({
                success: true,
                token: token,
                firstname: userData.firstname,
                usertype: userData.usertype // Ensure usertype is included in the response
            });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);

module.exports = router;

// utils/AuthUser.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sha256Hex } = require("./CryptoService");

/**
 * Separate function for credential check (#4).
 * Returns the user doc if valid; otherwise null.
 */
async function checkCredentials(email, password) {
  const normalizedEmail = email.toLowerCase().trim();
  const emailHash = sha256Hex(normalizedEmail);

  const user = await User.findOne({ emailHash });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return user;
}

module.exports = { checkCredentials };

// utils/cryptoService.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load keys
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8');
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');

// Encrypt with public key (for register)
function encrypt(plain) {
  if (!plain) return null;
  const buffer = Buffer.from(String(plain), 'utf8');
  const encrypted = crypto.publicEncrypt(
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    buffer
  );
  return encrypted.toString('base64');
}

// Decrypt with private key (for login/view)
function decrypt(ciphertext) {
  if (!ciphertext) return null;
  const buffer = Buffer.from(ciphertext, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    buffer
  );
  return decrypted.toString('utf8');
}

// Deterministic hash (for email lookup)
function sha256Hex(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex');
}

module.exports = { encrypt, decrypt, sha256Hex };

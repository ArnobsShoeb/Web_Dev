// utils/CryptoService.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Load keys (keep your paths as-is)
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "../keys/public.pem"), "utf8");
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "../keys/private.pem"), "utf8");

// --- Small-field RSA (you already use these for user info) ---
function encrypt(plain) {
  if (plain === null || plain === undefined) return null;
  const buffer = Buffer.from(String(plain), "utf8");
  const encrypted = crypto.publicEncrypt(
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  return encrypted.toString("base64");
}

function decrypt(ciphertext) {
  if (!ciphertext) return null;
  const buffer = Buffer.from(ciphertext, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  return decrypted.toString("utf8");
}

// --- Hybrid for arbitrary-length text fields (title/description/email/price) ---
/**
 * Returns a JSON string:
 * { v:1, alg:"RSA-OAEP/AES-256-GCM", iv, tag, ek, ct }  (all base64)
 */
function encryptText(plain) {
  if (plain === null || plain === undefined) return null;

  const key = crypto.randomBytes(32);   // AES-256 key
  const iv  = crypto.randomBytes(12);   // GCM nonce

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(String(plain), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  const ek = crypto.publicEncrypt(
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    key
  );

  const payload = {
    v: 1,
    alg: "RSA-OAEP/AES-256-GCM",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ek: ek.toString("base64"),
    ct: ct.toString("base64"),
  };
  return JSON.stringify(payload);
}

function decryptText(payloadStr) {
  if (!payloadStr) return null;
  const p = JSON.parse(payloadStr);

  const iv  = Buffer.from(p.iv, "base64");
  const tag = Buffer.from(p.tag, "base64");
  const ek  = Buffer.from(p.ek, "base64");
  const ct  = Buffer.from(p.ct, "base64");

  const key = crypto.privateDecrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    ek
  );

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt.toString("utf8");
}

function sha256Hex(s) {
  return crypto.createHash("sha256").update(String(s)).digest("hex");
}

module.exports = { encrypt, decrypt, encryptText, decryptText, sha256Hex };

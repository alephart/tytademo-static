// server.js
const next = require("next");

// Get environment
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

// Return app
module.exports = {
  app,
};

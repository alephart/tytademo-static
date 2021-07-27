// server.js
const next = require("next");
const timeout = require("connect-timeout");

// Get environment
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.use(timeout("60s"));

// Return app
module.exports = {
  app,
};

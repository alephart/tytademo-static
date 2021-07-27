const cluster = require("cluster");
const timeout = require("connect-timeout");
const { createServer } = require("http");
const { parse } = require("url");

// Import app
const { app } = require("./server");

const handle = app.getRequestHandler();

// Port
const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpuCount = 4;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  // Listening
  app.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      handle(req, res, parsedUrl);
    })
      .use(timeout("60s"))
      .listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
      });
  });
}

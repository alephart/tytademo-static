const cluster = require("cluster");
const express = require("express");
const { parse } = require("url");
const timeout = require("connect-timeout");

// Import app
const { app } = require("./server");

const handle = app.getRequestHandler();

// Port
const PORT = process.env.PORT || 3000;

const workers = {};

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) {
    next();
  }
};

function spawn() {
  const worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}

if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpuCount = require("os").cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    spawn();
  }

  cluster.on("death", function (worker) {
    console.log("worker " + worker.pid + " died. spawning a new process...");
    delete workers[worker.pid];
    spawn();
  });
} else {
  // Listening
  app.prepare().then(() => {
    const server = express();
    server.use(timeout("180s"));
    server.use(haltOnTimedout);

    server.all("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
}

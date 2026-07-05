const cluster = require("cluster");
const os = require("os");
const app = require("./app");
const db = require("../config/db");
const { Crons } = require("./crons/tasks");

const port = process.env.PORT || 5000;

const startServer = () => {
  const server = app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => process.exit(1));
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });

  return server;
};

// Check if running on Vercel
const isVercel = process.env.VERCEL === "1" || process.env.NOW_REGION;

// Check if running on Render
const isRender =
  process.env.RENDER === "true" || process.env.RENDER_EXTERNAL_URL;

if (isVercel) {
  // Vercel mode: Just export the app as a serverless function
  console.log("Running on Vercel - Serverless mode");
  module.exports = app;
} else if (isRender) {
  // Render mode: NO clustering - Render handles scaling
  console.log("Running on Render - Single instance mode");
  console.log(`Memory limit: ${process.env.NODE_OPTIONS || "512MB"}`);

  // Connect to database
  db.connect();

  // Start cron jobs (optional - be careful with memory)
  // Crons(); // Uncomment if needed, but monitor memory

  // Start server directly - NO clustering
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => process.exit(1));
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });
} else {
  // DigitalOcean/Local mode: Full cluster setup
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(`Starting ${os.cpus().length} workers...`);

    db.connect();
    Crons();

    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });

    process.on("SIGINT", () => {
      console.log("Master shutting down...");
      for (const id in cluster.workers) {
        cluster.workers[id].kill();
      }
      process.exit(0);
    });
  } else {
    db.connect();
    Crons();
    startServer();
  }
}

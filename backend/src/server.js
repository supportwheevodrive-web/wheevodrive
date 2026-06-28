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

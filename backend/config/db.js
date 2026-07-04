const mongoose = require("mongoose");
require("dotenv").config();

// Make sure your DATABASE_URL variables are properly formatted
// Should look like: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PRODUCTION
    : process.env.DATABASE_URL_DEV;

mongoose.set("strictQuery", true);

module.exports.connect = async () => {
  try {
    await mongoose.connect(dbUrl, {
      maxPoolSize: 500,
      minPoolSize: 50,
      maxIdleTimeMS: 60000,
      connectTimeoutMS: 10000, // Increased from 5000

      serverSelectionTimeoutMS: 10000, // Increased from 5000
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
    });
    console.log("Database connected successfully");

    // Add connection event listeners for better monitoring
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Database connection error:", error);
    // Don't exit process immediately, allow retry logic
    throw error;
  }
};

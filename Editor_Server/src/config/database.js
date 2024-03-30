const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGODB_URL = process.env.DATABASE_MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDB;

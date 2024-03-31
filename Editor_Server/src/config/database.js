const mongoose = require("mongoose");
const connectDB = async () => {
  const MONGODB_URL = process.env.DATABASE_MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {}
};
module.exports = connectDB;
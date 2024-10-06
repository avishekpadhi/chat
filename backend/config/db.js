const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected: ${conn.connection.host}`.red.bold);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;

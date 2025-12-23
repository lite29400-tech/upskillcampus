// config/database.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Ye dono variable accept karega – jo bhi set ho
    const dbUrl =
      process.env.DATABASE_URL ||
      process.env.MONGODB_URL ||
      'mongodb+srv://CodeWithAzhar:Azhar@@@3332@cluster0.rapmamy.mongodb.net/studycircle?retryWrites=true&w=majority';

    if (!dbUrl) {
      throw new Error(
        "DATABASE_URL or MONGODB_URL not found in environment variables!"
      );
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error while connecting to Database:");
    console.error(error.message);
    // Vercel/Render pe gracefully band ho jayega, lekin crash nahi karega (better for logs)
    // process.exit(1);  ← isko comment kar denge production mein
  }
};

module.exports = { connectDB };

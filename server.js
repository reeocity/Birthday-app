const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config();

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.use("/api/users", require("./src/routes/userRoutes"));

// ⏳ Start cron job
require("./src/jobs/birthdayReminderJob");

// Handle Vercel serverless environment
module.exports = app;

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

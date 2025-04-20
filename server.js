const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require('dotenv');
const app = express();

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", require("./src/routes/userRoutes"));

// ⏳ Start cron job
require("./src/jobs/birthdayReminderJob");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

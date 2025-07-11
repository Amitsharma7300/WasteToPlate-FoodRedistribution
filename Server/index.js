const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Internal imports
const connectDB = require("./config/Db");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const foodRoutes = require("./routes/foodroutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const receiverRoutes = require("./routes/receiverRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminDonorRoutes = require("./routes/adminDonorRoutes");
const donorRoutes = require("./routes/donorRoutes");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminDonorRoutes);
app.use("/api/donor", donorRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("🌐 UrbanFood Auth API Running");
});

// Connect to DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

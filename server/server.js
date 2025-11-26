const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)   // <-- IMPORTANT fixed variable
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

// Test Route (to confirm server works)
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Server Listen
app.listen(5000, () => console.log("Server running on port 5000"));


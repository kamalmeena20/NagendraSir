
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const pubRoutes = require('./routes/publications');
const teamRoutes = require('./routes/team');
const profileRoutes = require('./routes/profile');
const galleryRoutes = require('./routes/gallery');
const readingRoutes = require('./routes/reading');
const contactRoutes = require('./routes/contact');
const collaboratorRoutes = require('./routes/collaborators');
const uploadRoutes = require("./routes/upload");
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const careerRoutes = require('./routes/career');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/publications', pubRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/collaborators', collaboratorRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);


// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Server running fine' }));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

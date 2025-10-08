const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const studentRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Attendance System API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      attendance: '/api/attendance'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

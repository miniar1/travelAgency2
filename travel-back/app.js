// app.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
require('dotenv').config();

// Import routes
const adminRoutes = require('./routes/admin');
const voyageRoutes = require('./routes/voyage');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5123;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/voyages', voyageRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Trip Management API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'));
}
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Start the server
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes
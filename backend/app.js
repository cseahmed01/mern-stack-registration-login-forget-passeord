const express = require('express');
const cors = require('cors');
const router = require('./routes/api'); // Make sure this is correctly imported

const app = express();

// Basic Test Route
app.get('/', (req, res) => {
    res.json("This is the API page.");
});

// Set API Routes
app.use('/api', router);

// CORS Configuration
app.use(cors({
    origin: "*", // For simplicity, allow all origins during debugging
    methods: ["POST", "GET"],
    credentials: true
}));

// Export app for Vercel's serverless environment
module.exports = app;

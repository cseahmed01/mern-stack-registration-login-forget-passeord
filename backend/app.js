const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const router = require('./routes/api');
const fileUpload = require('express-fileupload');
const { MONGODB_CONNECTION, MAX_JSON_SIZE, URL_ENCODED, WEB_CACHE, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME } = require('./app/config/config');

// Import the User model to create the collection if it doesn't exist
require('./app/models/User');

const app = express();

// Global Application Middleware
app.use(cors({
    origin: ["https://mern-stack-frontend-ochre.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Set max file size to 50MB
}));

// Rate Limiter
const limiter = rateLimit({
    windowMs: REQUEST_LIMIT_TIME,
    max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web Caching
app.set('etag', WEB_CACHE);

// MongoDB connection
mongoose.connect(MONGODB_CONNECTION, { autoIndex: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.get('/', (req, res) => {
    res.json("THIS IS API PAGE");
});

// Set API Routes
app.use('/api', router);

// Set Application Storage (static files if needed)
app.use(express.static('storage'));

// Export app for Vercel's serverless environment
module.exports = app;

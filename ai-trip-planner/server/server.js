const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenAI } = require('@google/genai');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// 1. Initialize Express app FIRST
const app = express();

// 2. Middleware setup
app.use(cors());
app.use(express.json());

// 3. Environment variables & Database setup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Initialize Gemini SDK (automatically picks up process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 4. Mongoose Schemas & Models
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: String, required: true },
    travelWith: { type: String, required: true },
    itinerary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Trip = mongoose.model('Trip', tripSchema);

// 5. Auth Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

// 6. Routes
// Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists or invalid data.' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ error: 'Invalid email or password.' });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// Generate Trip Route (Protected) - Powered by Gemini Free Tier
app.post('/api/generate-trip', verifyToken, [
    body('destination').notEmpty().withMessage('Destination is required'),
    body('days').isInt({ min: 1, max: 30 }).withMessage('Days must be a number between 1 and 30'),
    body('budget').isIn(['Cheap', 'Moderate', 'Luxury']).withMessage('Invalid budget selection'),
    body('travelWith').notEmpty().withMessage('Travel partner selection is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { destination, days, budget, travelWith } = req.body;
        const prompt = `Generate a structured ${days}-day travel itinerary for ${destination} with a ${budget} budget, traveling with ${travelWith}.`;
        
        // Call Gemini free tier model
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
        });

        const itineraryText = response.text;

        const newTrip = new Trip({ 
            userId: req.user._id, 
            destination, 
            days: Number(days), 
            budget, 
            travelWith, 
            itinerary: itineraryText 
        });
        await newTrip.save();

        res.status(201).json({ success: true, trip: newTrip });
    } catch (error) {
        console.error("GEMINI API ERROR:", error);
        res.status(500).json({ error: error.message || "Internal server error while generating trip." });
    }
});

// Get Trips Route (Protected)
app.get('/api/trips', verifyToken, async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, trips });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch saved trips." });
    }
});

// 7. Database Connection & Server Startup
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Database connection error:', err));
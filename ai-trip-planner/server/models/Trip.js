const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: String, required: true },
    travelWith: { type: String, required: true },
    itinerary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
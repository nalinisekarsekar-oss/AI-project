const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    returnedAmount: { type: Number, default: 0 },
    description: { type: String },
    type: { type: String, enum: ['income', 'outcome', 'borrow'], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);

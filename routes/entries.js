const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// GET all entries
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find().sort({ date: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new entry
router.post('/', async (req, res) => {
    try {
        const { name, amount, description, type } = req.body;
        const newEntry = new Entry({ name, amount, description, type });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH update returned amount for a borrow entry
router.patch('/:id/return', async (req, res) => {
    try {
        const { returnedAmount } = req.body;
        const entry = await Entry.findById(req.params.id);
        
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        if (entry.type !== 'borrow') return res.status(400).json({ error: 'Only borrow entries can be updated' });

        entry.returnedAmount = (entry.returnedAmount || 0) + parseFloat(returnedAmount);
        await entry.save();
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

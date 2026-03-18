const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 5001;
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting MongoDB:", err);
    });

 
const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
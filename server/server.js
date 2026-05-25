const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const transcriptionRoutes = require('./routes/transcriptionRoutes');

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', transcriptionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Speech-to-Text API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
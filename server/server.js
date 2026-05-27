const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const transcriptionRoutes = require('./routes/transcriptionRoutes')
const authRoutes = require('./routes/authRoutes')

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', transcriptionRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'VoiceScript API is running 🚀' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
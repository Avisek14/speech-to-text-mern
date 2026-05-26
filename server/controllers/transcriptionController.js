const Transcription = require('../models/Transcription');
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// @desc    Upload audio and transcribe
// @route   POST /api/transcribe
// @access  Public
const transcribeAudio = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    // Send to Groq Whisper API
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-large-v3',
      response_format: 'verbose_json',
    });

    // Save to MongoDB
    const savedTranscription = await Transcription.create({
      audioFileName: req.file.filename,
      transcriptionText: transcription.text,
    });

    // Delete audio file after transcription
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Transcription successful',
      transcription: savedTranscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transcriptions
// @route   GET /api/transcriptions
// @access  Public
const getTranscriptions = async (req, res) => {
  try {
    const transcriptions = await Transcription.find().sort({ createdAt: -1 });
    res.status(200).json(transcriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { transcribeAudio, getTranscriptions };
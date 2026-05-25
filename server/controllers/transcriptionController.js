const Transcription = require('../models/Transcription');

// @desc    Upload audio and transcribe
// @route   POST /api/transcribe
// @access  Public (for now)
const transcribeAudio = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    // For now just return file info (Whisper API Day 4 me add karenge)
    res.status(200).json({
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transcriptions
// @route   GET /api/transcriptions
// @access  Public (for now)
const getTranscriptions = async (req, res) => {
  try {
    const transcriptions = await Transcription.find().sort({ createdAt: -1 });
    res.status(200).json(transcriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { transcribeAudio, getTranscriptions };

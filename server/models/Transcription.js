const mongoose = require('mongoose')

const transcriptionSchema = new mongoose.Schema(
  {
    audioFileName: {
      type: String,
      required: true,
    },
    transcriptionText: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transcription', transcriptionSchema)
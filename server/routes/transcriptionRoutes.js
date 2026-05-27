const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const {
  transcribeAudio,
  getTranscriptions,
  deleteTranscription,
} = require('../controllers/transcriptionController')
const { protect } = require('../middleware/authMiddleware')

router.post('/transcribe', protect, upload.single('audio'), transcribeAudio)
router.get('/transcriptions', protect, getTranscriptions)
router.delete('/transcriptions/:id', protect, deleteTranscription)

module.exports = router
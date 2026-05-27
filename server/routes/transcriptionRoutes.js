const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const {
  transcribeAudio,
  getTranscriptions,
  deleteTranscription,
} = require('../controllers/transcriptionController')

router.post('/transcribe', upload.single('audio'), transcribeAudio)
router.get('/transcriptions', getTranscriptions)
router.delete('/transcriptions/:id', deleteTranscription)

module.exports = router
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  transcribeAudio,
  getTranscriptions,
} = require('../controllers/transcriptionController');

router.post('/transcribe', upload.single('audio'), transcribeAudio);
router.get('/transcriptions', getTranscriptions);

module.exports = router;

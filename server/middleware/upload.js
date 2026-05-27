const multer = require('multer')
const path = require('path')
const fs = require('fs')

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|mp4|wav|m4a|webm|ogg/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = file.mimetype.startsWith('audio/')

  if (extname || mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Only audio files are allowed! (MP3, WAV, M4A, OGG, WEBM)'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 },
})

module.exports = upload
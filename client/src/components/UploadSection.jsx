import toast from 'react-hot-toast'
import { useState, useRef } from 'react'
import axios from 'axios'

const UploadSection = ({ setTranscription, setLoading, loading, onNewTranscription }) => {
  const [recording, setRecording] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const fileInputRef = useRef(null)

  // Send audio to backend
  const sendAudio = async (audioBlob, name) => {
  setLoading(true)
  setTranscription('')
  try {
    const formData = new FormData()
    formData.append('audio', audioBlob, name)
    const res = await axios.post('http://localhost:5000/api/transcribe', formData)
    setTranscription(res.data.transcription.transcriptionText)
    onNewTranscription(res.data.transcription)
    toast.success('Transcription complete! 🎉')
  } catch (error) {
    toast.error('Transcription failed! Try again.')
    setTranscription('❌ Error: ' + error.message)
  } finally {
    setLoading(false)
  }
}

  // File upload handler
  const handleFileUpload = (file) => {
  if (!file) return
  const allowedTypes = /mp3|mp4|wav|m4a|webm|ogg/
  const extname = allowedTypes.test(
    file.name.split('.').pop().toLowerCase()
  )
  if (!extname && !file.type.startsWith('audio/')) {
    toast.error('Only audio files allowed! (MP3, WAV, M4A)')
    return
  }
  if (file.size > 25 * 1024 * 1024) {
    toast.error('File too large! Max 25MB allowed.')
    return
  }
  setFileName(file.name)
  sendAudio(file, file.name)
}

  // Drag and drop
  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }

  // Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioChunksRef.current = []
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
      sendAudio(audioBlob, 'recording.wav')
      stream.getTracks().forEach(track => track.stop())
    }

    mediaRecorder.start()
    setRecording(true)
  }

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <div className="space-y-6">

      {/* Drag & Drop Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-all duration-300
          ${dragOver
            ? 'border-purple-400 bg-purple-500/20 scale-105'
            : 'border-white/20 hover:border-purple-400 hover:bg-white/5'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        <div className="text-5xl mb-3">📁</div>
        <p className="text-white font-semibold text-lg">
          {fileName ? fileName : 'Drop audio file here'}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          or click to browse — MP3, WAV, M4A supported
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      {/* Record Button */}
      <div className="flex justify-center">
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={loading}
          className={`
            relative w-28 h-28 rounded-full font-bold text-white text-sm
            transition-all duration-300 shadow-2xl
            flex flex-col items-center justify-center gap-1
            ${recording
              ? 'bg-red-500 shadow-red-500/50 scale-110'
              : 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/50 hover:scale-110 hover:shadow-purple-500/70'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Pulse animation when recording */}
          {recording && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></span>
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20 animation-delay-150"></span>
            </>
          )}
          <span className="text-3xl relative z-10">{recording ? '⏹️' : '🎙️'}</span>
          <span className="relative z-10 text-xs">
            {recording ? 'Stop' : 'Record'}
          </span>
        </button>
      </div>

      {recording && (
        <p className="text-center text-red-400 animate-pulse font-medium">
          🔴 Recording... Click stop when done
        </p>
      )}

    </div>
  )
}

export default UploadSection
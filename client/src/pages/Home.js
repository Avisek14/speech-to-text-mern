import { useState } from 'react'
import UploadSection from '../components/UploadSection'
import TranscriptionResult from '../components/TranscriptionResult'

const Home = () => {
  const [transcription, setTranscription] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6 shadow-lg shadow-purple-500/50">
            <span className="text-4xl">🎙️</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Speech to Text
          </h1>
          <p className="text-gray-400 text-lg">
            Upload or record audio and get instant transcription
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-8">
          <UploadSection
            setTranscription={setTranscription}
            setLoading={setLoading}
            loading={loading}
          />
        </div>

        {/* Transcription Result */}
        {(transcription || loading) && (
          <div className="max-w-2xl mx-auto mt-6">
            <TranscriptionResult
              transcription={transcription}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
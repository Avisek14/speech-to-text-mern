import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import UploadSection from '../components/UploadSection'
import TranscriptionResult from '../components/TranscriptionResult'
import TranscriptionHistory from '../components/TranscriptionHistory'

const Home = () => {
  const { user, logout } = useAuth()
  const [transcription, setTranscription] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/transcriptions',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        setHistory(res.data)
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setHistoryLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleNewTranscription = (newItem) => {
    setHistory((prev) => [newItem, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-lg">🎙️</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VoiceScript
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-300 text-sm font-medium">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-200"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

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
            onNewTranscription={handleNewTranscription}
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

        {/* History Section */}
        {historyLoading ? (
          <div className="text-center mt-10">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <TranscriptionHistory
            history={history}
            setHistory={setHistory}
          />
        )}

      </div>
    </div>
  )
}

export default Home
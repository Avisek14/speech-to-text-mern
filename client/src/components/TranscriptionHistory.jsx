import { useState } from 'react'
import axios from 'axios'

const TranscriptionHistory = ({ history, setHistory }) => {
  const [deletingId, setDeletingId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await axios.delete(`http://localhost:5000/api/transcriptions/${id}`)
      setHistory((prev) => prev.filter((item) => item._id !== id))
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (history.length === 0) return null

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🕒 <span>History</span>
        </h2>
        <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {history.length} transcription{history.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={item._id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-purple-400/30 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🎙️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(item._id, item.transcriptionText)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-400/30 transition-all duration-200"
                >
                  {copiedId === item._id ? '✅ Copied' : '📋 Copy'}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200 disabled:opacity-50"
                >
                  {deletingId === item._id ? '⏳' : '🗑️ Delete'}
                </button>
              </div>
            </div>

            {/* Transcription Text */}
            <p className="text-gray-200 leading-relaxed text-sm bg-white/5 rounded-xl p-4 border border-white/5">
              {item.transcriptionText}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TranscriptionHistory
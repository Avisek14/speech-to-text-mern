const TranscriptionResult = ({ transcription, loading }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription)
    alert('Copied to clipboard!')
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-8 transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📝 <span>Transcription</span>
        </h2>
        {transcription && !loading && (
          <button
            onClick={copyToClipboard}
            className="text-sm text-purple-400 hover:text-purple-300 border border-purple-400/30 hover:border-purple-300 px-3 py-1 rounded-lg transition-all duration-200 hover:bg-purple-400/10"
          >
            📋 Copy
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">Transcribing your audio...</p>
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
          <p className="text-gray-200 leading-relaxed text-lg">
            {transcription}
          </p>
        </div>
      )}
    </div>
  )
}

export default TranscriptionResult
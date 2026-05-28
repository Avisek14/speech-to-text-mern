const Footer = () => {
  return (
    <footer className="relative z-10 mt-16 mb-6">
      <div className="max-w-2xl mx-auto">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left — Branding */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-sm">🎙️</span>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VoiceScript
              </span>
            </div>

            {/* Center — Info */}
            <p className="text-gray-500 text-xs text-center">
              Powered by{' '}
              <span className="text-purple-400 font-medium">Groq Whisper</span>
              {' '}•{' '}
              <span className="text-purple-400 font-medium">MERN Stack</span>
            </p>

            {/* Right — Copyright */}
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} VoiceScript. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
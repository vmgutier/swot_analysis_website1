import { useState } from 'react'

export default function HeroSection({ challenge, setChallenge, onStartLearning }) {
  const handleInputChange = (e) => {
    setChallenge(e.target.value)
  }

  const handleStartClick = () => {
    if (challenge.trim()) {
      onStartLearning()
    }
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slideUp">
          Understand Your Situation with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SWOT Analysis</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slideUp" style={{ animationDelay: '0.1s' }}>
          Break down any problem into strengths, weaknesses, opportunities, and threats. A simple yet powerful framework for strategic thinking.
        </p>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <label className="block text-left mb-4">
            <span className="text-gray-700 font-semibold mb-2 block">What challenge is your organization facing?</span>
            <input
              type="text"
              value={challenge}
              onChange={handleInputChange}
              placeholder="e.g., Entering a new market, scaling technology, reducing costs..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </label>

          <button
            onClick={handleStartClick}
            disabled={!challenge.trim()}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
              challenge.trim()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Start Learning →
          </button>
        </div>

        {/* Helper text */}
        <p className="text-gray-500 text-sm mt-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          No challenge in mind? Try: "Increasing customer retention" or "Adopting new technology"
        </p>
      </div>
    </section>
  )
}

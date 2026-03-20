import { useState } from 'react'

export default function ProblemStatement({ initialValue, onSubmit }) {
  const [problem, setProblem] = useState(initialValue)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!problem.trim()) {
      setError('Please describe your organizational challenge')
      return
    }
    onSubmit(problem)
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slideUp">
          What challenge are we solving?
        </h1>
        <p className="text-lg text-gray-600 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          Clearly define the problem or opportunity you want to analyze with SWOT.
        </p>
      </div>

      {/* Problem Statement Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {/* Instruction */}
        <label className="block mb-4">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
            📋 Problem Statement
          </span>
          <p className="text-gray-600 text-sm mb-4">
            Provide a detailed description of the challenge, opportunity, or situation you want to analyze.
          </p>
        </label>

        {/* Text Area */}
        <textarea
          value={problem}
          onChange={(e) => {
            setProblem(e.target.value)
            setError('')
          }}
          onKeyDown={handleKeyDown}
          placeholder="Example: We need to expand our customer base in a new market while managing limited resources and increasing competition..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none h-40 text-gray-800"
        />

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Character Count */}
        <div className="mt-3 text-right text-sm text-gray-500">
          {problem.length} characters
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Next: Analyze SWOT →
        </button>

        {/* Helper Text */}
        <p className="text-center text-gray-500 text-xs mt-4">
          💡 Tip: Press Ctrl+Enter (or Cmd+Enter on Mac) to quickly submit
        </p>
      </div>

      {/* Tips Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '🎯',
            title: 'Be Specific',
            desc: 'The more detailed your problem statement, the better your analysis will be.'
          },
          {
            icon: '📊',
            title: 'Include Context',
            desc: 'Mention relevant market conditions, resources, or constraints.'
          },
          {
            icon: '🔍',
            title: 'Stay Focused',
            desc: 'Keep it to one primary challenge per analysis.'
          }
        ].map((tip, idx) => (
          <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <p className="text-2xl mb-2">{tip.icon}</p>
            <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-600">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

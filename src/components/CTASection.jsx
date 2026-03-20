import { useState, useEffect } from 'react'

export default function CTASection({ challenge, onStartAnalysis }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Ready to Analyze?
        </h2>

        {/* Description */}
        <p className={`text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {challenge 
            ? `Now that you understand SWOT analysis, let's apply it to your challenge: "${challenge}". In Part 2, you'll create your own SWOT analysis and get AI-powered insights.`
            : 'Now that you understand SWOT analysis, let\'s create your own! In Part 2, you\'ll build a personalized analysis and get AI-powered insights.'}
        </p>

        {/* Key Takeaways */}
        <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-white mb-2">Understand</h3>
            <p className="text-white text-opacity-80 text-sm">SWOT divides factors into internal/external and positive/negative</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Analyze</h3>
            <p className="text-white text-opacity-80 text-sm">Identify all factors relevant to your specific situation</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-bold text-white mb-2">Act</h3>
            <p className="text-white text-opacity-80 text-sm">Create strategies based on your SWOT analysis</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-8 mb-12 border border-white border-opacity-30 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-white font-bold mb-4 text-lg">What's in Part 2:</h3>
          <ul className="text-white text-opacity-90 space-y-3 text-left max-w-2xl mx-auto">
            <li className="flex items-center">
              <span className="text-2xl mr-3">✨</span>
              <span>Interactive form to enter your own SWOT factors</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">🤖</span>
              <span>AI-powered suggestions and insights for your analysis</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">📊</span>
              <span>Visual dashboard of your SWOT matrix</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">💾</span>
              <span>Save and track your analysis over time</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button 
            onClick={onStartAnalysis}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
          >
            Start Your Analysis →
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all">
            Learn More
          </button>
        </div>

        {/* Footer Note */}
        <p className={`mt-12 text-white text-opacity-70 text-sm transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          This is Part 1 of 3: Understanding SWOT • Part 2: Your Analysis • Part 3: Action Planning
        </p>
      </div>
    </section>
  )
}
